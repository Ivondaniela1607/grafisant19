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
        primary: '#B0CA13', 
        primaryLigth: '#ecf1d2', 
        secondary: '#7987a1', 
        grayLigth: '#F1F3F6',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
     
    },
  },
  plugins: [],
}

