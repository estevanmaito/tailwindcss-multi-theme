module.exports = {
  purge: ['*.html'],
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
