'use client';

import { useEffect, useState } from 'react';
import { Sun } from 'lucide-react';

export function UserNav() {
  const [theme, setTheme] = useState<'light'>('light');

  // Force light theme on mount
  useEffect(() => {
    setTheme('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    // <button
    //   disabled
    //   className="relative w-14 h-7 bg-gray-200 rounded-full flex items-center"
    // >
    //   <span className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center">
        
    //   </span>
    // </button>
    <button></button>
  );
}
