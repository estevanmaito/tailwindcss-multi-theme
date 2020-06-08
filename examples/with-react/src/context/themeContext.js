import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious(theme) {
  const ref = useRef()
  useEffect(() => {
    ref.current = theme
  })
  return ref.current
}

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  // defaults to light theme
  const [theme, setTheme] = useState('light')

  // set user's preferred color scheme on first load
  useLayoutEffect(() => {
    setTheme(
      !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    )
  }, [])

  // change theme
  const oldTheme = usePrevious(theme)
  useLayoutEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`)
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme, oldTheme])

  function toggleTheme() {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
