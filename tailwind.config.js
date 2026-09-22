/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#10b981', // Emerald green accent for sports theme
          600: '#059669',
        }
      }
    },
  },
  plugins: [],
}