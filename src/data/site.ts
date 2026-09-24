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

/** Home-page sections, in the order they appear on the page. */
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
