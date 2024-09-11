/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#FF4081",
        darkBackground: "#1E1E1E",
        darkCardBackground: "#252526",
        darkText: "#FFFFFF",
        darkSecondaryText: "#A6A6A6",
        darkBorder: "#404040",
      },
    },
    screens: {
      md: "820px",
    },
  },
  plugins: [],
};
