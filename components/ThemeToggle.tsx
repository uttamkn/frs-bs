'use client'

import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    updateTheme(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    updateTheme(newDarkMode)
  }

  const updateTheme = (isDarkMode: boolean) => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light')
  }

  return (
    <button
      className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <i className="bi bi-sun-fill"></i>
      ) : (
        <i className="bi bi-moon-fill"></i>
      )}
    </button>
  )
}

