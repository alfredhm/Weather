/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        '101': '1000px',
        '2screen': '200vh'
      },
      width: {
        '101': '850px',
      },
      boxShadow: {
        'added': "0 0 1rem 0 rgba(0, 0, 0, .2)",
        'before': "inset 0 0 200px rgba(255, 255, 255, .08)"
      },
      gap: {
        '3%': '3%'
      },
      minWidth: {
        '100px': '100px',
        '70px': '70px'
      },
      screens: {
        'no-scroll': '1066px',
        'xs': '390px',
        'details': '520px',
      },
      maxWidth: {
        '200px': '200px'
      },
      minHeight: {
        '60px': '60px'
      }
      
    },
  },
  plugins: [],
}

