/**
 * Compiles the site's content (src/data/*) into one plain-text brief for the
 * Ask-the-Editor assistant, written to api/_knowledge.ts.
 *
 * Runs on prebuild. The output is committed so the serverless function never
 * depends on build ordering; re-run with `node scripts/build-knowledge.mjs`
 * after editing content.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadData, root } from './load-data.mjs';

const d = await loadData();

const strip = (md) => md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/`/g, '');
const tier = (l) => (l >= 88 ? 'Fluent' : l >= 82 ? 'Proficient' : 'Familiar');

const sections = [
  `# Suraj Nandan — profile
Full-stack developer (React, Node.js, TypeScript, Python, Java) building web products and AI systems. Based in ${d.LOCATION}. B.Tech CSE at SRM Institute of Science and Technology, class of 2027. Open to internships, full-time roles and freelance work. Author of the book "${d.book.title}". Works as an AI training contractor at Mercor. Roles he goes by: ${d.ROLES.map((r) => r.label.toLowerCase()).join(', ')}.
Contact: surajnandan78@gmail.com · GitHub github.com/SpaceWalkerr · LinkedIn linkedin.com/in/surajnandan · LeetCode leetcode.com/u/SurajNandan · DEV ${d.PROFILES.devto.replace('https://', '')} · Fiverr ${d.PROFILES.fiverr.replace('https://www.', '')} · Gumroad ${d.PROFILES.gumroad.replace('https://', '')} · Site surajnandan.in
Résumé (one page): surajnandan.in/Suraj_Resume.pdf`,

  `# Experience\n` +
    d.experiences
      .map(
        (e) => `## ${e.role} — ${e.company}${e.period ? ` (${e.period})` : ''}${e.companyUrl ? ` · ${e.companyUrl}` : ''}
${e.description}
Highlights: ${e.highlights.join('; ')}
Technologies: ${e.technologies.join(', ')}${e.projectsBuilt ? `\nPlatforms built: ${e.projectsBuilt.map((p) => `${p.name} (${p.url})`).join(', ')}` : ''}
Full report:
${strip(e.details)}`
      )
      .join('\n\n'),

  `# Book
"${d.book.title}: ${d.book.subtitle}" is a ${d.book.genre.toLowerCase()} book by ${d.book.author}. ${
    d.book.buyUrl ? `Buy it: ${d.book.buyUrl}` : 'It is not on sale yet; the site shows it as "coming soon".'
  } Page: surajnandan.in/book
Back cover: "${d.book.tagline}" ${d.book.blurb.join(' ')}
You will learn: ${d.book.learn.join('; ')}. Also: ${d.book.features.join('; ')}.`,

  `# Novel
"${d.novel.title}" is a ${d.novel.genre.toLowerCase()} novel by ${d.novel.author}, his first, published in 2026. ${
    d.novel.buyUrl ? `Buy it: ${d.novel.buyUrl}` : 'It is on sale on Amazon (search for the title and author).'
  }${d.novel.editions?.length ? ` Other editions: ${d.novel.editions.map((e) => `${e.label} ${e.url}`).join(', ')}.` : ''} Page: surajnandan.in${d.novel.path}. All books: surajnandan.in/books
First line: "${d.novel.tagline}" ${d.novel.blurb.join(' ')}
${d.novel.authorNote}`,

  `# Services — hiring Suraj
Fixed-scope jobs ordered through Fiverr (${d.PROFILES.fiverr}); for bigger work, email surajnandan78@gmail.com. Prices in USD for the Basic / Standard / Premium tiers, as shown on the site.\n` +
    d.services.map((s) => `- ${s.title}: ${s.blurb} ($${s.tiers.join(' / $')})`).join('\n'),

  `# Guides and tools (Gumroad store: ${d.PROFILES.gumroad})\n` +
    d.guides.map((g) => `- ${g.title} — ${g.price}, ${g.format}. ${g.blurb} ${g.url}`).join('\n'),

  `# Writing on DEV (${d.PROFILES.devto})
${d.devto.total} published articles as of ${d.devto.fetchedAt.slice(0, 10)}: honest notes from a student learning to build software, plus "The Wire", a daily tech and security news desk written with AI and labelled as such. Latest:\n` +
    d.devto.articles
      .slice(0, 12)
      .map((a) => `- ${a.title} (${a.date.slice(0, 10)}) ${a.url}`)
      .join('\n'),

  `# Essays on Medium (${d.PROFILES.medium})
Personal essays: phones and focus, growing up in Kishanganj, and what building software as a student teaches you. Section on the site: surajnandan.in/#medium. Latest:\n` +
    d.medium.stories
      .map(
        (s) =>
          `- ${s.title} (${s.date.slice(0, 10)}${s.publication ? `, in ${s.publication}` : ''}) — ${s.excerpt} ${s.url}`
      )
      .join('\n'),

  `# Projects\n` +
    d.projects
      .map(
        (p) => `## ${p.name} [${p.category}] — page: surajnandan.in/projects/${p.slug}
${p.description}
Stack: ${p.tags.join(', ')} · Live: ${p.liveDemo ?? 'none (source only)'}${p.github ? ` · Source: ${p.github.replace(/\.git$/, '')}` : ' · Source: private'}`
      )
      .join('\n\n'),

  `# Education\n` +
    d.education
      .map(
        (e) => `## ${e.degree} — ${e.institution}, ${e.location} (${e.period}, ${e.status}) · ${e.cgpa}
${e.highlights.join('; ')}${e.coursework ? `\nCoursework: ${e.coursework.join(', ')}` : ''}`
      )
      .join('\n\n'),

  `# Skills (tier = how he uses it)\n` +
    d.skillCategories
      .map((c) => `${c.title}: ${c.skills.map((s) => `${s.name} (${tier(s.level)})`).join(', ')}`)
      .join('\n'),

  `# Certifications & achievements
Notable: ${d.notableAchievements.map((a) => `${a.title} — ${a.description}`).join('; ')}
All: ${d.certifications.map((c) => `${c.title} (${c.platform}, ${c.year}${c.score ? `, ${c.score}` : ''})`).join('; ')}`,

  `# Articles (the Op-Ed)\n` +
    d.posts.map((p) => `## ${p.title} — surajnandan.in/blog/${p.slug} (${p.date})\n${p.content}`).join('\n\n'),
];

const text = sections.join('\n\n---\n\n');
const file = path.join(root, 'api', '_knowledge.ts');
fs.writeFileSync(
  file,
  `// GENERATED by scripts/build-knowledge.mjs — do not edit by hand.\nexport const KNOWLEDGE = ${JSON.stringify(text)};\n`
);
console.log(`knowledge: ${text.length.toLocaleString()} chars → ${path.relative(root, file)}`);
