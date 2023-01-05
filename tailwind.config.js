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
        'normal': '#DDDDDD',
      },
      boxShadow: {
        'normal': '2px 2px 6px 4px rgba(0,0,0,0.18)' 
      },
      backgroundImage: {
        'special': 'linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)',
        'linear': 'linear-gradient(to top, #441EA5, #CE247A)',
      },
      screens: {
        'ssm': '0px',
        'ssm640': {
          "max": '640px'
        },
        'max1024': {
          "max": "1024px"
        },
        "max1100": {
          "max": "1100px"
        },
        "min867max1100": {
          "min": "867px",
          "max": "1100px"
        },
        'slg1250': {
          'min': '1030px'
        },
        'slg1280': '1280px',
        'max299': {
          'max': '299px'
        },
        'min640max1024': {
          "min": '640px',
          "max": "1024px"
        },
        "max819": {
          "min": "641px",
          "max": "819px"
        },
        "min694max814": {
          "min": "694px",
          "max": "814px"
        },
        "min820max1195": {
          "min": "820px",
          "max": "1195px"
        },
        "max1380": {
          "max": "1380px"
        },
        "min1200": {
          "min": "1200px"
        },
        "ssm767": {
          "max": "767px"
        },
        "max1029": {
          "max": "1029px"
        },
        "max840": {
          "max": "840px"
        },
        "max400": {
          "max": "400px"
        },
        "max324": {
          "max": "324px"
        },
        "max600": {
          "max": "600px"
        },
        "max866": {
          "max": "866px"
        },
        "min640max866": {
          "min": "640px",
          "max": "866px"
        },
        "max350": {
          "max": "350px"
        },
        "max477": {
          "max": "477px"
        },
        "ssm639": {
          "max": "639px"
        },
        "max505": {
          "max": "505px"
        }, 
        "max966": {
          "max": "966px"
        },
        "max1195": {
          "max": "1195px"
        },
        "min401max866": {
          "min": "401px",
          "max": "866px"
        },
        "min1500": {
          "min": "1500px"
        }
      }
    },
  },
  plugins: [],
}
