/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#22c55e',
        'border': '#DDDDDD',
        'color_nav_item': '#717171'
      },
      fill: {
        'primary': '#22c55e'
      },
      backgroundColor: {
        'primary': '#22c55e',
        'normal': '#DDDDDD'
      },
      borderColor: {
        'normal': '#DDDDDD'
      },
      boxShadow: {
        'normal': '2px 2px 6px 4px rgba(0,0,0,0.18)' 
      },
      backgroundImage: {
        'special': 'linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)'
      }
    },
  },
  plugins: [],
}
