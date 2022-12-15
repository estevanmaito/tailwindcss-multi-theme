# Tailwind CSS Multi Theme

<p>
  <a href="https://codecov.io/gh/estevanmaito/tailwindcss-multi-theme"><img src="https://codecov.io/gh/estevanmaito/tailwindcss-multi-theme/branch/master/graph/badge.svg" alt="codecov" /></a>
  <a href="https://travis-ci.com/github/estevanmaito/tailwindcss-multi-theme"><img src="https://img.shields.io/travis/estevanmaito/tailwindcss-multi-theme" alt="Travis (.org)" /></a>
  <a href="https://www.npmjs.com/package/tailwindcss-multi-theme"><img src="https://img.shields.io/npm/v/tailwindcss-multi-theme" alt="npm" /></a>
  <a href="https://github.com/estevanmaito/tailwindcss-multi-theme/blob/master/LICENSE"><img src="https://img.shields.io/github/license/estevanmaito/tailwindcss-multi-theme" alt="MIT License" /></a>
</p>

Most theme plugins ask too much from the start. If you know how to create a simple page with default Tailwind, you already know how to use this theme plugin.

> **WARNING**: this plugin is designed for Tailwind v2!

[🧪 See it live](https://tailwindcss-multi-theme.now.sh/)

[🧱 See examples](/examples)

## 💿 Install

```sh
npm install tailwindcss-multi-theme
```

In `tailwind.config.js` add `themeVariants` to the `theme` property, with the value(s) of your theme(s), and require the plugin. That's it.

```js
// tailwind.config.js
const multiThemePlugin = require('tailwindcss-multi-theme')

module.exports = {
  // Disable dark mode -> theme management is provided by multi-theme plugin
  darkMode: false,
  theme: {
    themeVariants: [
      // Define themes here
      'light',
      'dark',
      'banana'
    ]
  },
  variants: {
    // just add 'light', 'dark' and 'banana' to any variant that you want to style
  },
  plugins: [
    // Multi-theme plugin
    multiThemePlugin(),
    // ...
  ]
}
```

It will create a set of classes based on your `variants` and expect a class `.theme-<the name of your themeVariants>` at the top of your HTML document.

`themeVariants: ['dark']` would activate its classes under `.theme-dark`.

## 🚀 Usage

### Options

|name              |type              |default                 |
|-                 |-                 |-                       |
|themeClassPrefix  |`String`          |`'theme-'`              |

**Example**:

```js
// tailwind.config.js
plugins: [
  multiThemePlugin({
    /**
     * Overwrite default theme class name themeClassPrefix
     * It will generate:
     * - 'light' class instead of 'theme-light'
     * - 'dark' class instead of 'theme-dark'
     * - 'banana' class instead of 'theme-banana'
     * - ...
     */
    themeClassPrefix: ''
  }),
  // ...
],
```

### Theme names

You can use special characters in your theme names (see also [CSS specification](https://www.w3.org/TR/CSS2/syndata.html#characters) or [this topic](https://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers)).

**Example**:

Here, we add `@` prefix to the theme names to easily identify theme in class names:

```js
// tailwind.config.js
const multiThemePlugin = require('tailwindcss-multi-theme')

module.exports = {
  // Disable dark mode -> theme management is provided by multi-theme plugin
  darkMode: false,
  theme: {
    themeVariants: [
      // Define themes here
      '@light',
      '@dark',
      '@banana'
    ],
    // Theme colors
    colors: {
      white:                  '#FFFFFF',
      black:                  '#000000',
      '@light-alabaster':     '#FAFAFA',
      '@dark-tuna':           '#36393F',
      '@banana-sandy-yellow': '#FFEA78',
      // and other theme colors...
    },
  },
  variants: {
    extend: {
      backgroundColor: [
        '@light',
        '@light:hover',
        '@light:focus',
        '@dark',
        '@dark:hover',
        '@dark:focus'
      ],
      // ...
    }
  },
  plugins: [
    // Multi-theme plugin
    multiThemePlugin({
      themeClassPrefix: ''
    }),
    // ...
  ]
}
```

In this example, it will generate:

- class names: `@light`, `@dark`, `@banana` (e.g. set attribute `class="@light"` to the `<html>` element to apply *light* theme)
- tailwind variants: `@light`, `@dark`, `@banana` (e.g. set class `@dark:hover:bg-red` to apply a red background on hover for *dark* theme)

### Good practices

It's suggested to define your theme colors in a separated file (for example `./themes.js` in your project):

> **TIP**: you can use a tool like [color-name-finder](https://colors.artyclick.com/color-name-finder/) to name your colors correctly

```js
// Example: themes.js

const commonColors = {
  // primary, secondary, etc... should be the same for all themes
  "primary": "#3B68CF",
  "secondary": "#36393F",
  // ...
}

module.exports = {
  themes: {
    // 'light' theme specific colors
    'light': {
      ...commonColors,
      'alabaster': '#FAFAFA',
      'text-primary': '#191919'
    },
    // 'dark' theme specific colors
    'dark': {
      ...commonColors,
      'tuna': '#36393F',
      'text-primary': '#F9F9F9'
    },
    // 'banana' theme specific colors
    'banana': {
      ...commonColors,
      'sandy-yellow': '#FFEA78',
      'text-primary': '#121212'
    }
  }
}
```

Then you can dynamically set in `tailwind.config.js`:

```js
// Example: tailwind.config.js
const multiThemePlugin = require('tailwindcss-multi-theme')
const themes = require('./themes.js')

module.exports = {
  darkMode: false,
  theme: {
    themeVariants: [
      /**
       * It will generate theme names:
       * - '@light'
       * - '@dark'
       * - '@banana'
       */
      ...Object.keys(themes).map((theme) => {
        return `@${theme}`
      })
    ],
    colors: {
      /**
       * It will generate colors:
       * - '@light-primary'
       * - '@light-secondary'
       * - '@light-alabaster'
       * - '@light-text-primary'
       * - '@dark-primary'
       * - '@dark-secondary'
       * - '@dark-tuna'
       * - '@dark-text-primary'
       * - '@banana-primary'
       * - '@banana-secondary'
       * - '@banana-sandy-yellow'
       * - '@banana-text-primary'
       */
      ...Object.keys(themes).reduce((colors, themeName) => {
        // Loop on theme colors
        for (const color in themes[themeName]) {
          const colorName = `@${themeName}-${color}`
          const colorValue = themes[themeName][color]
          obj[colorName] = colorValue
        }
        return obj
      }, {})
    },
  },
  plugins: [
    // Multi-theme plugin
    multiThemePlugin({
      themeClassPrefix: ''
    }),
    // ...
  ],
  //...
}
```

So, you can use the generated theme colors:

```html
<!-- 
  Example: apply a background color and a text color to the <body> element
  depending on what theme is applied
-->
<body
  class="
    @light:bg-@light-alabaster
    @light:text-@light-text-primary
    @dark:bg-@dark-tuna
    @dark:text-@dark-text-primary
    @banana:bg-@banana-sandy-yellow
    @banana:text-@banana-text-primary
  "
>
  ...
</body>
```

OR (in style):

```scss
body {
  // 'light' theme rules
  @apply @light:bg-@light-alabaster;
  @apply @light:text-@light-text-primary;
  // 'dark' theme rules
  @apply @dark:bg-@dark-tuna;
  @apply @dark:text-@dark-text-primary;
  // 'banana' theme rules
  @apply @banana:bg-@banana-sandy-yellow;
  @apply @banana:text-@banana-text-primary;
}
```
