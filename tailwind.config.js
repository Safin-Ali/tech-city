/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        mincho: ['Sawarabi Mincho', 'serif'],
        lexend: ['Lexend', 'sans-serif'],
        DMsans: ['DM Sans', 'sans-serif'],
      },
      colors:{
        'blue': {
          '800': '#3D84FF',
          '900': '#0058fb',
        },
      },
    },
  },
  plugins: [],
}