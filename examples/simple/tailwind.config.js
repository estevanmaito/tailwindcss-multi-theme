module.exports = {
  purge: [],
  theme: {
    themeVariants: ['dark'],
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'dark'],
    textColor: ['responsive', 'dark'],
  },
  plugins: [require('tailwindcss-multi-theme')],
}
