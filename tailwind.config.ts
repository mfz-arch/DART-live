import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dart: {
          green: "#006B38",
          emerald: "#059669",
          mint: "#10B981",
          gold: "#D97706",
          slate: "#0F172A",
          border: "#E2E8F0",
          textMuted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        lightGlass: "0 10px 30px -5px rgba(0, 0, 0, 0.05)",
        greenGlow: "0 0 20px rgba(0, 107, 56, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
