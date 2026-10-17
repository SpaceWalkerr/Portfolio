/** Practical guides and tools sold on Gumroad — rendered by the Guides section. */
export interface Guide {
  slug: string;
  title: string;
  blurb: string;
  format: string;
  price: string;
  url: string;
  image: string;
}

export const guides: Guide[] = [
  {
    slug: 'ship-it',
    title: 'Ship It — Deploy Checklist',
    blurb: 'Env vars, Supabase auth and RLS, and the build errors that break Vercel deploys. Run it before every push.',
    format: 'PDF · 6 pages',
    price: '$6',
    url: 'https://surajnandan.gumroad.com/l/ship-it-deploy-checklist',
    image: '/guides/deploy.jpg',
  },
  {
    slug: 'interview',
    title: 'Fresher Dev Interview Checklist',
    blurb: 'A 4-week plan: DSA topics, CS fundamentals, project stories and HR answers, in the order they get asked.',
    format: 'PDF · 8 pages',
    price: '$8',
    url: 'https://surajnandan.gumroad.com/l/fresher-developer-interview-checklist',
    image: '/guides/interview.jpg',
  },
  {
    slug: 'git',
    title: 'Git & GitHub Cheat Sheet',
    blurb: 'The commands you actually use — plus recipes for the wrong branch, a rejected push and a leaked secret.',
    format: 'PDF · 3 pages',
    price: '$4',
    url: 'https://surajnandan.gumroad.com/l/git-github-cheat-sheet',
    image: '/guides/git.jpg',
  },
  {
    slug: 'resume',
    title: 'Resume & Cover Letter Pack',
    blurb: 'A one-page, ATS-friendly resume template, a filled example and four letter and email templates.',
    format: 'Word + PDF guide',
    price: '$6',
    url: 'https://surajnandan.gumroad.com/l/resume-cover-letter-pack',
    image: '/guides/resume.jpg',
  },
  {
    slug: 'tracker',
    title: 'Freelance Tracker',
    blurb: 'Clients, projects, invoices with overdue flags, time log, quote calculator and a dashboard in one sheet.',
    format: 'Excel + Google Sheets',
    price: '$8',
    url: 'https://surajnandan.gumroad.com/l/freelance-tracker-spreadsheet',
    image: '/guides/tracker.jpg',
  },
];
