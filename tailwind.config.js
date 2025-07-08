/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#C0C9EE",
        secondary : "#DBDBDB",
        accent : "#E16A54"
      }
    },
  },
  plugins: [],
}

