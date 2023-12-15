/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xxl': '0 0 30px 7px rgba(177, 255, 200, 0.2)',
      },
      colors: {
        'bg-blue': '#060020',
      },
    },
  },
  plugins: [],
}