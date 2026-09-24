/** Tiny event bridge so any component can open the (lazy-loaded) command palette. */
export const OPEN_COMMAND_PALETTE = 'open-command-palette';
export const openCommandPalette = () => window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE));
