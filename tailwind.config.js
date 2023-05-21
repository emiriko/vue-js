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
      },
      backgroundImage: {
        gradientIndigo: 'linear-gradient(134.01deg, #A43BF6 40.75%, #4CA9FF 90.52%)'
      },
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
      },
      maxWidth: {
        '640': '640px',
      },
      whitespace: {
        'break-words': 'break-word',
      },
    },
  },
  variants: {
    extend: {},
  },
}
