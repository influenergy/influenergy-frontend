'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function UserNav() {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  return (
    <button
    onClick={toggleTheme}
    className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center transition-colors duration-300 ease-in-out"
  >
    {/* Sliding Knob */}
    <span
      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center transform transition-transform duration-300 ease-in-out ${
        theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
      }`}
    >
      {theme === 'light' ? (
        <Sun size={14} className="text-yellow-500" />
      ) : (
        <Moon size={14} className="text-indigo-400" />
      )}
    </span>
  </button>
  );


}
