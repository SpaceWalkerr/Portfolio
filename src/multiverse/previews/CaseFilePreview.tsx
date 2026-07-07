/**
 * U-05 preview — a manila case file. Redaction bars slide away on a loop
 * to reveal the subject's name, with a red pushpin + string connecting
 * two evidence tabs beneath it.
 */
const CaseFilePreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-[#e4ddc8] font-monopress text-[#1c1815]">
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      }}
    />

    <div className="absolute left-3 top-2 flex w-[calc(100%-24px)] justify-between text-[7px] tracking-[0.14em] text-[#8a1f1f]">
      <span>CASE No. SN-2026</span>
      <span>ACTIVE</span>
    </div>

    <div className="absolute left-3 top-9 text-[13px] font-bold tracking-tight">
      <span className="relative inline-block">
        SURAJ NANDAN
        <span className="animate-mv-redact absolute -inset-y-0.5 inset-x-0 bg-[#111010]" aria-hidden="true" />
      </span>
    </div>

    <div className="absolute left-3 top-[58%] h-px w-[70%] bg-[#1c1815]/25" />

    <svg viewBox="0 0 160 60" className="absolute bottom-6 left-3 h-[34%] w-[calc(100%-24px)]" aria-hidden="true">
      <path d="M20 12 C 50 30, 70 8, 100 26 S 140 14, 150 30" fill="none" stroke="#8a1f1f" strokeWidth="1.4" opacity="0.85" />
      <circle cx="20" cy="12" r="4" fill="#8a1f1f" stroke="#e4ddc8" strokeWidth="1" />
      <circle cx="100" cy="26" r="4" fill="#8a1f1f" stroke="#e4ddc8" strokeWidth="1" />
      <circle cx="150" cy="30" r="4" fill="#8a1f1f" stroke="#e4ddc8" strokeWidth="1" />
    </svg>

    <div className="absolute bottom-2 right-3 border border-[#1c1815]/50 text-[6.5px] leading-relaxed tracking-[0.08em]">
      <div className="border-b border-[#1c1815]/25 px-1.5 py-0.5">SUBJECT: FULL-STACK DEV</div>
      <div className="px-1.5 py-0.5">STATUS: OPEN</div>
    </div>
  </div>
);

export default CaseFilePreview;
