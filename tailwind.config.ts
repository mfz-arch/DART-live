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
          gold: "#F59E0B",
          obsidian: "#090D16",
          slate: "#121826",
          darkCard: "rgba(18, 24, 38, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
          textMuted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        greenGlow: "0 0 20px rgba(16, 185, 129, 0.35)",
        goldGlow: "0 0 20px rgba(245, 158, 11, 0.35)",
      },
      animation: {
        pulseSlow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glowPulse 2s ease-in-out infinite alternate",
        ticker: "tickerSlide 25s linear infinite",
      },
      keyframes: {
        glowPulse: {
          "0%": { boxShadow: "0 0 5px rgba(16, 185, 129, 0.4)" },
          "100%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(0, 107, 56, 0.6)" },
        },
        tickerSlide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
