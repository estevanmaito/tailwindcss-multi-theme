# Tailwind CSS Multi Theme

<p>
  <a href="https://codecov.io/gh/estevanmaito/tailwindcss-multi-theme"><img src="https://codecov.io/gh/estevanmaito/tailwindcss-multi-theme/branch/master/graph/badge.svg" alt="codecov" /></a>
  <a href="https://travis-ci.com/github/estevanmaito/tailwindcss-multi-theme"><img src="https://img.shields.io/travis/estevanmaito/tailwindcss-multi-theme" alt="Travis (.org)" /></a>
  <a href="https://www.npmjs.com/package/tailwindcss-multi-theme"><img src="https://img.shields.io/npm/v/tailwindcss-multi-theme" alt="npm" /></a>
  <a href="https://github.com/estevanmaito/tailwindcss-multi-theme/blob/master/LICENSE"><img src="https://img.shields.io/github/license/estevanmaito/tailwindcss-multi-theme" alt="MIT License" /></a>
</p>

Most theme plugins ask too much from the start. If you know how to create a simple page with default Tailwind, you already know how to use this theme plugin.

[🧪 See it live](https://tailwindcss-multi-theme.now.sh/)

[🧱 See examples](/examples)

## 💿 Install

```sh
npm install tailwindcss-multi-theme
```

In `tailwind.config.js` add `themeVariants` to the `theme` property, with the value(s) of your theme(s), and require the plugin. That's it.

```js
module.exports = {
  theme: {
    themeVariants: ['dark']
  },
  variants: {
    // just add dark to any variant that you want to style
  },
  plugins: [require('tailwindcss-multi-theme')],
}
```

It will create a set of classes based on your `variants` and expect a class `.theme-<the name of your themeVariants>` at the top of your HTML document.

`themeVariants: ['dark']` would activate its classes under `.theme-dark`.

## 🚀 Usage

👉 `themeVariants` is the only configuration option.

It expects an array of strings, so there is **no limit** to how many themes you can create. Want a dark and a neon theme (you don't need to specify your default)? Do this:

```js
module.exports = {
  theme: {
    themeVariants: ['dark', 'neon']
  },
  variants: {
    // just add dark and neon to any variant that you want to style
  },
  plugins: [require('tailwindcss-multi-theme')],
}
```

You can now place the class `.theme-dark` or `.theme-neon` at the top of your HTML (eg. on `body` or an enclosing `div`) and just write classes like:

`dark:bg-gray-900 dark:text-gray-300`

But just this won't work. You need to specify what variants of your theme you want, in your `variants`:

```js
...
variants: {
  backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
  textColor: ['responsive', 'hover', 'focus', 'dark'],
},
...
```

What if you need to style the `hover`, `focus` or any other variant on some specific theme?

```js
...
variants: {
  backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
  textColor: ['responsive', 'hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
},
...
```

The same way you would write it in HTML (`dark:hover:bg-red-100`) you write in your `variants` settings, just by adding a `:` before the variant.

So, if you're already using `focus-within`, it would be called `dark:focus-within`, considering your theme is called `dark`.

### Using inside CSS with `@apply`

**UPDATE**: Tailwind CSS ^1.7.0 ([Use `@apply` with variants and other complex classes](https://github.com/tailwindlabs/tailwindcss/releases/tag/v1.7.0#use-apply-with-variants-and-other-complex-classes)) now supports this syntax:

```css
.btn {
  @apply border-4 border-gray-300 dark:border-dark-gray-600;
}
```

Another way, (and the only way for Tailwind CSS prior to v1.7.0), is the following.

If you're more into writing some CSS using `@apply`, you could try the code below. Note that it needs nesting support, and you can find more about it [in the official docs](https://tailwindcss.com/docs/using-with-preprocessors/#nesting).

```css
input {
  @apply bg-gray-300;
}

input:focus {
  @apply bg-white;
}

/**
 * Place your theme styles inside .theme-<your-theme>
 * In this case, we have themeVariants: ['dark']
 */
.theme-dark {
  input {
    @apply bg-gray-800;
  }

  input:focus {
    @apply bg-gray-500;
  }
}
```

If you want to avoid nesting for some reason, this syntax is also perfectly valid:

```css
.theme-dark input {
  @apply bg-gray-800;
}

.theme-dark input:focus {
  @apply bg-gray-500;
}
```

### How to automatically apply the theme based on user's preferences?

a.k.a `prefers-color-scheme`

You should use [prefers-dark.js](./prefers-dark.js) to detect if it is supported. If so, the theme will be applied automatically. Place it in the top of the `head` of your HTML (execute early to reduce the flash of light theme).

[By the way, you can check one of the examples](/examples)

If you're looking for a CSS only approach, you could give [tailwindcss-theming](https://github.com/innocenzi/tailwindcss-theming) a try.

## ❓ Why another theme plugin?

I'll tell you the truth. I'm lazy. I created this plugin for people that, like me, just want to keep writing Tailwind CSS as always, with the same familiar syntax, no theme files, no extensive obligatory docs read to know how to color my backgrounds.

It just prepends your theme variable to the good old Tailwind classes.