/**
 * Site-wide facts shared by the navbar, footer, command palette and copy —
 * one source so the sections, location and dates can't drift apart again.
 */

/** Public location — city and country only. */
export const LOCATION = 'Kishanganj, India';
export const CITY = 'Kishanganj';

/** Year the first line of production code shipped — "Est." on the masthead. */
export const CAREER_START_YEAR = 2023;
export const yearsBuilding = () => new Date().getFullYear() - CAREER_START_YEAR;

/** Storefronts and writing platforms — one source for the footer, contact block, palette and feeds. */
export const PROFILES = {
  devto: 'https://dev.to/suraj_nandan',
  fiverr: 'https://www.fiverr.com/surajnandan7',
  gumroad: 'https://surajnandan.gumroad.com',
  youtube: 'https://www.youtube.com/@surajnandan8283',
  instagram: 'https://www.instagram.com/pencil_in_a_box_/',
} as const;
export const DEVTO_USERNAME = 'suraj_nandan';

/**
 * The roles shown as tags under the name on the hero. Each links to the section that proves it.
 * Keep the labels short — they are also used in the structured data and the assistant's brief.
 */
export const ROLES = [
  { label: 'Developer', to: 'projects' },
  { label: 'Programmer', to: 'github' },
  { label: 'AI Engineer', to: 'experience' },
  { label: 'Writer', to: 'dev' },
  { label: 'Book Author', to: 'book' },
  { label: 'Creator', to: 'videos' },
] as const;

/** Home-page sections, in the order they appear on the page. */
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'book', label: 'Book' },
  { id: 'dev', label: 'DEV' },
  // `inNav: false` keeps a section out of the (full) desktop nav row; the menu, footer and palette still list it
  { id: 'videos', label: 'Videos', inNav: false },
  { id: 'guides', label: 'Guides' },
  { id: 'github', label: 'Stats' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Hire' },
  // `navLabel` is the shorter text for the crowded desktop nav row; everywhere else uses `label`
  { id: 'certifications', label: 'Certifications', navLabel: 'Certs' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
