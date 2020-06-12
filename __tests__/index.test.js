import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import plugin from '../src/index'

const generatePluginCss = (config = {}) => {
  return postcss(
    tailwindcss({
      theme: {},
      corePlugins: false,
      plugins: [plugin],
      ...config,
    })
  )
    .process('@tailwind components; @tailwind utilities', {
      from: undefined,
    })
    .then(({ css }) => css)
}

const baseTestTheme = {
  theme: {
    themeVariants: ['dark'],
    colors: {
      gray: {
        '100': '#333333',
      },
    },
  },
  corePlugins: ['textColor'],
}

describe('plugin', () => {
  it('should throw if there is no themeVariants property inside theme', () => {
    return generatePluginCss()
      .then(() => {})
      .catch((e) => {
        expect(e.message).toBe('tailwindcss-multi-theme expects a themeVariants property in theme.')
      })
  })

  it('should throw if themeVariants is not an Array', () => {
    return generatePluginCss({
      theme: {
        themeVariants: 'dark',
      },
    })
      .then(() => {})
      .catch((e) => {
        expect(e.message).toBe('tailwindcss-multi-theme expects themeVariants to be an Array.')
      })
  })

  it('should throw if themeVariants is empty', () => {
    return generatePluginCss({
      theme: {
        themeVariants: [],
      },
    })
      .then(() => {})
      .catch((e) => {
        expect(e.message).toBe(
          'tailwindcss-multi-theme found themeVariants but it is empty. Pass it a list of strings or remove it.'
        )
      })
  })

  it('should generate base classes variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:text-gray-100 {
          color: #333333
        }
      `)
    })
  })

  it('should generate group-hover variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:group-hover'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .group:hover .dark\\:group-hover\\:text-gray-100 {
          color: #333333
        }
      `)
    })
  })

  it('should generate group-focus variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:group-focus'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .group:focus .dark\\:group-focus\\:text-gray-100 {
          color: #333333
        }
      `)
    })
  })

  it('should generate focus-within variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:focus-within'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:focus-within\\:text-gray-100:focus-within {
          color: #333333
        }
      `)
    })
  })

  it('should generate :first variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:first'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:first\\:text-gray-100:first-child {
          color: #333333
        }
      `)
    })
  })

  it('should generate :last variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:last'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:last\\:text-gray-100:last-child {
          color: #333333
        }
      `)
    })
  })

  it('should generate :odd variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:odd'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:odd\\:text-gray-100:nth-child(odd) {
          color: #333333
        }
      `)
    })
  })

  it('should generate :even variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:even'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:even\\:text-gray-100:nth-child(even) {
          color: #333333
        }
      `)
    })
  })

  it('should generate :hover variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:hover'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:hover\\:text-gray-100:hover {
          color: #333333
        }
      `)
    })
  })

  it('should generate :focus variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:focus'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:focus\\:text-gray-100:focus {
          color: #333333
        }
      `)
    })
  })

  it('should generate :focus placeholder variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:focus'],
        placeholderColor: ['focus', 'dark:focus'],
      },
      corePlugins: ['textColor', 'placeholderColor'],
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:focus\\:text-gray-100:focus {
          color: #333333
        }
        .placeholder-gray-100::placeholder {      
          color: #333333
        }
        .focus\\:placeholder-gray-100:focus::placeholder {
          color: #333333
        }
        .theme-dark .dark\\:focus\\:placeholder-gray-100:focus::placeholder {
          color: #333333
        }
      `)
    })
  })

  it('should generate :active variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:active'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:active\\:text-gray-100:active {
          color: #333333
        }
      `)
    })
  })

  it('should generate :visited variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:visited'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:visited\\:text-gray-100:visited {
          color: #333333
        }
      `)
    })
  })

  it('should generate :disabled variants', () => {
    return generatePluginCss({
      ...baseTestTheme,
      variants: {
        textColor: ['dark:disabled'],
      },
    }).then((css) => {
      expect(css).toMatchCss(`
        .text-gray-100 {
          color: #333333
        }
        .theme-dark .dark\\:disabled\\:text-gray-100:disabled {
          color: #333333
        }
      `)
    })
  })
})
