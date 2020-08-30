function checkDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function watchDarkMode() {
  if (!window.matchMedia) return

  window.matchMedia('(prefers-color-scheme: dark)').addListener(addDarkModeSelector)
}

function addDarkModeSelector() {
  if (checkDarkMode()) {
    // use your theme's class below
    document.documentElement.classList.add('theme-dark')
  } else {
    // use your theme's class below
    document.documentElement.classList.remove('theme-dark')
  }
}

addDarkModeSelector()
watchDarkMode()
