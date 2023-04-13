// Tailwind plugin
const plugin = require('tailwindcss/plugin')
// PostCSS selector parser
const selectorParser = require('postcss-selector-parser')

// Function to escape special characters in variant name
function escapeSpecialCharacters(str) {
  const regex = /([^(A-Za-z0-9-_ )])/g
  return str.replace(regex, '\\\$&') // eslint-disable-line
}

// Default options
const defaultOptions = {
  themeClassPrefix: 'theme-',
}

// Enable plugin options
module.exports = plugin.withOptions(function (options = {}) {
  // First, merge options object
  options = Object.assign(defaultOptions, options)
  // The plugin function
  return function ({ addVariant, theme }) {
    const themeVariants = theme('themeVariants')
    if (!themeVariants) {
      throw new Error('tailwindcss-multi-theme expects a themeVariants property in theme.')
    }

    if (!Array.isArray(themeVariants)) {
      throw new Error('tailwindcss-multi-theme expects themeVariants to be an Array.')
    }

    if (themeVariants.length === 0) {
      throw new Error(
        'tailwindcss-multi-theme found themeVariants but it is empty. Pass it a list of strings or remove it.'
      )
    }

    function generatePseudoClassVariant(themeVariant, pseudoClass, selectorPrefix = pseudoClass) {
      const cssClassName = escapeSpecialCharacters(`${options.themeClassPrefix}${themeVariant}`)
      const root = `.${cssClassName} `
      addVariant(`${themeVariant}:${selectorPrefix}`, ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `${themeVariant}${separator}${selectorPrefix}${separator}${sel.value}`
              sel.parent.insertBefore(sel, selectorParser().astSync(root))
              sel.parent.insertAfter(sel, selectorParser.pseudo({ value: `:${pseudoClass}` }))
            })
          }).processSync(selector)
        })
      })
    }

    function generateGroupVariant(themeVariant, pseudoClass, selectorPrefix) {
      const cssClassName = escapeSpecialCharacters(`${options.themeClassPrefix}${themeVariant}`)
      const root = `.${cssClassName} `
      addVariant(`${themeVariant}:${selectorPrefix}`, ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `${themeVariant}${separator}${selectorPrefix}${separator}${sel.value}`
              sel.parent.insertBefore(sel, selectorParser().astSync(`${root}.${pseudoClass} `))
            })
          }).processSync(selector)
        })
      })
    }

    function generateDefaultVariant(themeVariant) {
      const cssClassName = escapeSpecialCharacters(`${options.themeClassPrefix}${themeVariant}`)
      const root = `.${cssClassName} `
      addVariant(`${themeVariant}`, ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `${themeVariant}${separator}${sel.value}`
              sel.parent.insertBefore(sel, selectorParser().astSync(root))
            })
          }).processSync(selector)
        })
      })
    }

    themeVariants.forEach((tv) => {
      generateDefaultVariant(tv)
      generateGroupVariant(tv, 'group:hover', 'group-hover')
      generateGroupVariant(tv, 'group:focus', 'group-focus')
      generatePseudoClassVariant(tv, 'focus')
      generatePseudoClassVariant(tv, 'hover')
      generatePseudoClassVariant(tv, 'active')
      generatePseudoClassVariant(tv, 'visited')
      generatePseudoClassVariant(tv, 'disabled')
      generatePseudoClassVariant(tv, 'focus-within')
      generatePseudoClassVariant(tv, 'first-child', 'first')
      generatePseudoClassVariant(tv, 'last-child', 'last')
      generatePseudoClassVariant(tv, 'nth-child(even)', 'even')
      generatePseudoClassVariant(tv, 'nth-child(odd)', 'odd')
    })
  }
})