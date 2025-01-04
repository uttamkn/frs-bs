"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedDarkMode = localStorage.getItem("darkMode") === "true";
      setDarkMode(storedDarkMode);
      updateTheme(storedDarkMode);
    }
  }, []);

  useEffect(() => {
    updateTheme(darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const updateTheme = (isDarkMode: boolean) => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      isDarkMode ? "dark" : "light"
    );
  };

  return (
    <button
      className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <i className="bi bi-sun-fill"></i>
      ) : (
        <i className="bi bi-moon-fill"></i>
      )}
    </button>
  );
}
