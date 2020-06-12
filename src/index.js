const selectorParser = require('postcss-selector-parser')

module.exports = ({ addVariant, theme, e }) => {
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

  themeVariants.forEach((tv) => {
    const root = `.theme-${tv} `

    addVariant(`${tv}`, ({ modifySelectors, separator }) => {
      modifySelectors(({ selector }) => {
        return selectorParser((selectors) => {
          selectors.walkClasses((sel) => {
            sel.value = `${tv}${separator}${sel.value}`
            sel.parent.insertBefore(sel, selectorParser().astSync(root))
          })
        }).processSync(selector)
      })
    })

    addVariant(`${tv}:group-hover`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root} .group:hover .${e(`${tv}${separator}group-hover${separator}${className}`)}`
      })
    })

    addVariant(`${tv}:group-focus`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root} .group:focus .${e(`${tv}${separator}group-focus${separator}${className}`)}`
      })
    })

    addVariant(`${tv}:focus-within`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}focus-within${separator}${className}`)}:focus-within`
      })
    })

    addVariant(`${tv}:first`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}first${separator}${className}`)}:first-child`
      })
    })

    addVariant(`${tv}:last`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}last${separator}${className}`)}:last-child`
      })
    })

    addVariant(`${tv}:odd`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}odd${separator}${className}`)}:nth-child(odd)`
      })
    })

    addVariant(`${tv}:even`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}even${separator}${className}`)}:nth-child(even)`
      })
    })

    addVariant(`${tv}:hover`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}hover${separator}${className}`)}:hover`
      })
    })

    addVariant(`${tv}:focus`, ({ modifySelectors, separator }) => {
      modifySelectors(({ selector }) => {
        return selectorParser((selectors) => {
          selectors.walkClasses((sel) => {
            sel.value = `${tv}${separator}focus${separator}${sel.value}:focus`
            sel.parent.insertBefore(sel, selectorParser().astSync(root))
          })
        }).processSync(selector)
      })
    })

    addVariant(`${tv}:active`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}active${separator}${className}`)}:active`
      })
    })

    addVariant(`${tv}:visited`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}visited${separator}${className}`)}:visited`
      })
    })

    addVariant(`${tv}:disabled`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${root}.${e(`${tv}${separator}disabled${separator}${className}`)}:disabled`
      })
    })
  })
}
