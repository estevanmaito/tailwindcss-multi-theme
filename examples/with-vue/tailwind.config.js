module.exports = {
  purge: ['src/**/*.vue'],
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
