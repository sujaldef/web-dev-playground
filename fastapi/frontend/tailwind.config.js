// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path to match your project
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')], // ✅ Correct place
};
