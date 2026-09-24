import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Serves the Vercel functions in /api during `npm run dev`, so the chat and
 * live stats work locally. Each file exports Web-standard GET/POST handlers.
 */
const vercelApiDev = (): Plugin => ({
  name: 'vercel-api-dev',
  configureServer(server) {
    server.middlewares.use('/api/', async (req, res, next) => {
      const name = (req.url ?? '').split('?')[0].replace(/^\/+|\/+$/g, '');
      if (!/^[a-z-]+$/.test(name)) return next();
      try {
        const mod = await server.ssrLoadModule(`/api/${name}.ts`);
        const handler = mod[req.method ?? 'GET'];
        if (typeof handler !== 'function') {
          res.statusCode = 405;
          return res.end();
        }
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const request = new Request(`http://localhost${req.originalUrl ?? req.url}`, {
          method: req.method,
          headers: req.headers as Record<string, string>,
          body: chunks.length ? Buffer.concat(chunks) : undefined,
        });
        const response: Response = await handler(request);
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        if (response.body) {
          const reader = response.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
        }
        res.end();
      } catch (error) {
        server.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Expose server-only secrets (e.g. ANTHROPIC_API_KEY in .env) to the dev API handlers
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    base: '/',
    plugins: [react(), vercelApiDev()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
