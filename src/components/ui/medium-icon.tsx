/** Medium's mark (three ellipses), sized like a lucide icon — lucide ships no Medium glyph. */
const MediumIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <ellipse cx="6.75" cy="12" rx="6.75" ry="6.9" />
    <ellipse cx="17.4" cy="12" rx="3.4" ry="6.5" />
    <ellipse cx="22.9" cy="12" rx="1.1" ry="5.8" />
  </svg>
);

export default MediumIcon;
