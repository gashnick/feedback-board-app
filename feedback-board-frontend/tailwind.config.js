/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // If using Next.js App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Example: Using Inter font
      },
      colors: {
        primary: {
          light: "#67e8f9", // cyan-300
          DEFAULT: "#06b6d4", // cyan-500
          dark: "#0e7490", // cyan-700
        },
        secondary: {
          light: "#f9a8d4", // pink-300
          DEFAULT: "#ec4899", // pink-500
          dark: "#be185d", // pink-700
        },
        neutral: {
          lightest: "#f8fafc", // slate-50
          light: "#f1f5f9", // slate-100
          DEFAULT: "#64748b", // slate-500
          dark: "#334155", // slate-700
          darkest: "#0f172a", // slate-900
        },
      },
      boxShadow: {
        card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        input: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      borderRadius: {
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Optional: for better default form styling
  ],
};
// This Tailwind CSS configuration file sets up custom colors, fonts, and shadows
// for a feedback board frontend. It includes light and dark variants of primary and secondary colors,
// as well as neutral colors for backgrounds and text. The configuration also extends the default theme
// with custom box shadows and border radii, and includes the @tailwindcss/forms plugin for improved form styling.
