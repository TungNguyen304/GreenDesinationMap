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
      }
    },
  },
  plugins: [],
}
