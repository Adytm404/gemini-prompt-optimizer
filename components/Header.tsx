
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-primary-default dark:text-primary-light">
        Prompt Optimizer
      </h1>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </header>
  );
};
