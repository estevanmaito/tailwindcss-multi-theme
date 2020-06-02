# Simple example with preference detection

This example uses `prefers-dark.js` to apply the right theme based on user preference through `prefers-color-scheme: dark`. If you are looking for a way to also give the user options to change the theme, take a look at the exaple [with-alpine](../with-alpine)

Literally, the only difference this and the simple example is this line, before the end of `head`:

```html
  <script src="prefers-dark.js"></script>
</head>
```

### Test it

Clone the repo:

```sh
git clone https://github.com/estevanmaito/tailwindcss-multi-theme.git
```

Enter the project folder and execute it:

```sh
cd tailwindcss-multi-theme/examples/with-preference-detection
npm install
npm run tailwind
```

Now you can just open `index.html` in the browser.