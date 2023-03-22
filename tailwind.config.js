/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
    colors: {
      primary: "#272727",
      indigo: "#5228EE",
      grey: "#323443",
      violet: "#A890FF",
      'light-white': "#FBFBFB",
      'light-grey': "#D1D1D1"
    }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}