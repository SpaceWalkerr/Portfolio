import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The bioluminescence videos are large-ish binaries; let Vite serve them as
// static assets rather than inlining anything.
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.mp4", "**/*.webm"],
});
