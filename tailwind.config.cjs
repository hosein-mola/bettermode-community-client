/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    {
      pattern: /duration-*/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /duration/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
  ],
  theme: {
    extend: {
      rotate: {
        '30': '30deg',
        '60': '60deg',
      },
      animation: {
        vote: 'vote 1s ease-in-out',
      },
      keyframes: {
        vote: {
          '0%': {
            transform: 'translateY(0px)',
            opacity: '0'
          },
          '25%': {
            transform: 'translateY(0.5rem)',
            opacity: '0.25'
          },
          '75%': {
            transform: 'translateY(-0.5rem)',
            opacity: '0.75'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
      },
      transitionProperty: {
        multiple: "width , height , backgroundColor , border-radius"
      },
      fontFamily: {
        IRANSansX: ['IRANSansX'],
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      colors: {
        primary: '#023e8a',
        secondary: '#0096c7',
        accent: '#FFD04B',
        panel: '#F5F5F5',
        danger: '#A53737',
        disable: '#8A8A8A'
      },
      height: {
        '100': '30rem',
        '128': '36rem',
      },
      transitionDuration: {
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '850': '850ms',
        '900': '900ms',
        '1000': '1000ms',
        '1050': '1050ms',
        '1100': '1100ms',
      }
    },
  },
  plugins: [
    require('tailwindcss-3d'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
