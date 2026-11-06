import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          700: "#1D4ED8",
          100: "#DBEAFE",
        },
        secondary: {
          700: "#0F766E",
        },
        neutral: {
          900: "#0F172A",
          600: "#475569",
          500: "#64748B",
          300: "#CBD5E1",
          50: "#F8FAFC",
        },
        status: {
          success: "#15803D",
          error: "#B91C1C",
          warning: "#B45309",
          info: "#0369A1",
        },
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "sans-serif"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        h2: ["28px", { lineHeight: "36px", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h4: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h5: ["18px", { lineHeight: "24px", fontWeight: "600" }],
        h6: ["16px", { lineHeight: "24px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "400" }],
        button: ["16px", { lineHeight: "24px", fontWeight: "600" }],
      },
      maxWidth: {
        mobile: "430px",
      },
    },
  },
  plugins: [],
} satisfies Config;
