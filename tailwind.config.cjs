/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [],
  theme: {
    extend: {
      colors: {
        primary: '#023e8a',
        secondary: '#0096c7',
        accent: '#FFD04B',
        panel: '#F5F5F5',
        danger: '#A53737',
        disable: '#8A8A8A',
        background: "#2c2f33",
        panel: "#313338",
        bluePurple: "#5865F2"
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
