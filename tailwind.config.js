/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Views/**/*.php",
    "./src/Resources/**/*.tsx",
    "./src/Resources/**/*.ts",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [require("@tailwindcss/typography")],
};
