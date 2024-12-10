/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      minHeight: {
        '75': '75vh',
      },
      colors: {
        manu: {
          pi: "#6A1F8E",
          ed: "#2690CC",
          mu: "#9EB826",
        },
        primary: '#B0CA13', // Add a custom primary color
        secondary: '#7987a1', // Add a custom secondary color
        grayLigth: '#F1F3F6',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        '2xl': '1.5rem', // Add a custom font size
      },
     
    },
  },
  plugins: [],
}

