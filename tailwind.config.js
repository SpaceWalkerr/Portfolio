/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base water column — pulled from the reference photography, not a
        // generic dark palette. Near-black navy, never pure #000.
        "abyss-black": "#050910",
        "deep-navy": "#0B1524",
        "surface-haze": "#16283A",

        // One accent per creature/section. Full saturation is only ever used on
        // the single signature element of its section (see brief §1 rule).
        "eel-teal": "#35E8B8",
        "flashlight-pink": "#F23FA0",
        "flashlight-cyan": "#3FE0F2",
        "anglerfish-amber": "#FFB347",
        "jelly-white": "#E8F4FF",
        "firefly-gold": "#F2D675",

        "text-primary": "#EAF2F6",
        "text-muted": "#7C93A3",
      },
      fontFamily: {
        // Instrument-readout mono: depth gauge, coordinates, index numbers.
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        // Condensed grotesk for headings (General Sans substitute).
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        // Quiet body.
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Depth-marker readouts use a tight, small mono scale.
        gauge: ["0.72rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      lineHeight: {
        // Body copy sits at 1.7 on dark ground per brief.
        relaxed: "1.7",
      },
      backgroundImage: {
        // The one rainbow moment — Comb Jelly, Contact section only.
        "comb-spectrum":
          "linear-gradient(90deg, #6BC1FF, #7BE0A0, #F2D675, #FF8A65, #C77DFF)",
      },
      keyframes: {
        "current-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "current-flow": "current-flow 3s linear infinite",
      },
    },
  },
  plugins: [],
};
