function prefersDark() {
  return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

if (prefersDark()) {
  // use your theme's class below
  document.documentElement.classList.add('theme-dark')
} else {
  // use your theme's class below
  document.documentElement.classList.remove('theme-dark')
}
