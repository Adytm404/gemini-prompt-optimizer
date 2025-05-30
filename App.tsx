
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { OptimizedResult } from './components/OptimizedResult';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { optimizePromptWithGemini } from './services/geminiService';
import { Theme } from './types';
import { LOCAL_STORAGE_THEME_KEY } from './constants';

const App: React.FC = () => {
  const [rawPrompt, setRawPrompt] = useState<string>('');
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
    }
  }, []);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }, []);

  const handleOptimizePrompt = useCallback(async () => {
    if (!rawPrompt.trim()) {
      setError("Please enter a prompt to optimize.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setOptimizedPrompt('');

    try {
      const result = await optimizePromptWithGemini(rawPrompt);
      setOptimizedPrompt(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      console.error("Optimization error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [rawPrompt]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="mt-8 space-y-8">
          <PromptInput
            rawPrompt={rawPrompt}
            onPromptChange={setRawPrompt}
            onSubmit={handleOptimizePrompt}
            isLoading={isLoading}
          />
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
          {optimizedPrompt && !isLoading && <OptimizedResult optimizedPrompt={optimizedPrompt} />}
        </main>
        <footer className="mt-12 text-center text-text-muted-light dark:text-text-muted-dark text-sm">
          <p>&copy; {new Date().getFullYear()} Prompt Optimizer Tool. Enhance your AI interactions.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
