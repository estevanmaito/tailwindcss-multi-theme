import React, { useContext } from 'react'
import { ThemeContext } from './context/themeContext'

import illustration from './wfh_1.svg'

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="h-screen overflow-y-auto dark:bg-gray-900">
      <div className="text-indigo-100 bg-indigo-700  dark:bg-gray-800 dark:text-gray-200">
        <div className="flex items-center justify-between h-16 max-w-6xl px-6 mx-auto">
          <a className="font-bold tracking-tight uppercase" href="#">
            tailwindcss multi theme
          </a>
          <ul className="flex items-center space-x-8 font-semibold" role="navigation">
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <button
                onClick={() => toggleTheme()}
                className="p-2 rounded focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg
                    className="w-5 h-5"
                    aria-label="Apply light theme"
                    role="image"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    aria-label="Apply dark theme"
                    role="image"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>
            </li>
            <li>
              <a className="px-6 py-2 text-orange-100 bg-orange-600 rounded-full" href="#">
                Log in
              </a>
            </li>
          </ul>
        </div>
      </div>
      <header className="">
        <div className="flex flex-col max-w-6xl px-6 py-16 mx-auto md:flex-row">
          <div className="flex flex-col justify-center pr-4 md:w-1/2">
            <div>
              <a
                className="inline-flex items-center pl-1 pr-2 mb-3 bg-indigo-100 rounded-full dark:bg-gray-800"
                href="#"
              >
                <span className="px-2 py-px mr-2 text-xs font-bold text-indigo-100 uppercase bg-indigo-700 rounded-full">
                  New
                </span>
                <span className="text-sm leading-loose text-indigo-800 dark:text-gray-300">
                  Visit our new products page →
                </span>
              </a>
            </div>
            <h1 className="text-5xl font-extrabold leading-none tracking-tight text-gray-800 lg:text-6xl dark:text-gray-400">
              It was never so easy to create themes
            </h1>
            <p className="mt-6 mb-12 text-lg text-gray-700 dark:text-gray-400">
              You can change this theme even by inspecting the code and applying the className{' '}
              <code className="px-1 text-purple-500 bg-gray-100 rounded dark:text-purple-200 dark:bg-gray-800">
                theme-dark
              </code>{' '}
              around
            </p>
            <div>
              <a
                className="px-6 py-2 font-semibold text-orange-100 bg-orange-600 rounded-full"
                href="#"
              >
                Read more
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img className="w-full" src={illustration} alt="Woman working from home" />
          </div>
        </div>
      </header>

      <main>
        <div className="flex flex-col max-w-6xl px-6 mx-auto mb-16 md:flex-row">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-center p-4 space-x-4 text-gray-700 rounded-lg shadow-xl dark:bg-gray-800 dark:text-gray-300">
              <div className="p-2 text-indigo-700 bg-indigo-100 rounded-full dark:text-indigo-100 dark:bg-indigo-700">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold ">Start where you are</h3>
                <p className="">No new syntax or configuration. Start with one property.</p>
              </div>
            </div>
            <div className="flex theme-dark">
              <div className="flex items-center w-full p-4 space-x-4 text-gray-700 rounded-lg shadow-xl dark:bg-gray-800 dark:text-gray-300">
                <div className="p-2 text-indigo-700 bg-indigo-100 rounded-full dark:text-indigo-100 dark:bg-indigo-700">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">This is dark!</h3>
                  <p className="">You can apply themes to every element, inside themes!</p>
                </div>
              </div>
            </div>
            <div className="flex items-center p-4 space-x-4 text-gray-700 rounded-lg shadow-xl dark:bg-gray-800 dark:text-gray-300">
              <div className="p-2 text-indigo-700 bg-indigo-100 rounded-full dark:text-indigo-100 dark:bg-indigo-700">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold ">See the code</h3>
                <p>
                  <a
                    className="text-blue-600 dark:text-blue-300"
                    href="https://github.com/estevanmaito/tailwindcss-multi-theme/tree/master/examples/simple"
                  >
                    The code
                  </a>{' '}
                  for this example is available for you to copy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
