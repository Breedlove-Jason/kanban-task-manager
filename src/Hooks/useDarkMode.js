import { useEffect, useState } from "react";

/**
 * Custom hook to manage dark mode theme.
 *
 * @returns {[string, function]} - Returns the current color theme and a function to set the theme.
 */
function useDarkMode() {
  // State to store the current theme, initialized from localStorage
  const [theme, setTheme] = useState(localStorage.theme);

  // Determine the opposite color theme
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    // Get the root element of the document
    const root = window.document.documentElement;

    // Remove the opposite theme class and add the current theme class
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Store the current theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  // Return the opposite color theme and the function to set the theme
  return [colorTheme, setTheme];
}

export default useDarkMode;
