import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

// DaisyUI'ın hazır temaları
const availableThemes = [
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' },
  { name: 'cupcake', label: 'Cupcake' },
  { name: 'bumblebee', label: 'Bumblebee' },
  { name: 'emerald', label: 'Emerald' },
  { name: 'corporate', label: 'Corporate' },
  { name: 'synthwave', label: 'Synthwave' },
  { name: 'retro', label: 'Retro' },
  { name: 'cyberpunk', label: 'Cyberpunk' },
  { name: 'valentine', label: 'Valentine' },
  { name: 'garden', label: 'Garden' },
  { name: 'aqua', label: 'Aqua' },
];

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const value = {
    currentTheme,
    setCurrentTheme,
    availableThemes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
