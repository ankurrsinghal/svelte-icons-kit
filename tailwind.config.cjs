/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        prime: 'rgb(255 62,0)'
      },
      fontFamily: {
        inter: 'Inter',
        overpass: 'Overpass',
        aleo: 'Aleo',
        lexend: 'Lexend',
      }
    },
  },
  plugins: [],
}

