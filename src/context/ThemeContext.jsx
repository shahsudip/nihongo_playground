// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('app_theme') || localStorage.getItem('shin500_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const isDark = theme === 'dark';

  const applyThemeToDOM = (t) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', t);
    if (t === 'dark') {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light', 'theme-sepia');
      root.style.backgroundColor = '#0d1117';
      root.style.color = '#f0f6fc';
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      root.style.backgroundColor = '#f4ecdc';
      root.style.color = '#2d2216';
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('app_theme', theme);
      localStorage.setItem('shin500_theme', theme);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme) => {
    const valid = newTheme === 'dark' ? 'dark' : 'light';
    setThemeState(valid);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
