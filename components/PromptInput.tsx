
import React from 'react';

interface PromptInputProps {
  rawPrompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ rawPrompt, onPromptChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
      <label htmlFor="rawPrompt" className="block text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
        Enter Your Raw Prompt
      </label>
      <textarea
        id="rawPrompt"
        value={rawPrompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., write a story about a dragon..."
        className="w-full h-40 p-3 border border-border-light dark:border-border-dark rounded-md focus:ring-2 focus:ring-primary-default focus:border-transparent bg-background-light dark:bg-slate-800 text-text-light dark:text-text-dark resize-none transition-colors"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-2 sm:mb-0">
          Press Ctrl+Enter (or Cmd+Enter on Mac) to submit.
        </p>
        <button
          onClick={onSubmit}
          disabled={isLoading || !rawPrompt.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-primary-default hover:bg-primary-dark text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-default disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out"
        >
          {isLoading ? 'Optimizing...' : 'Optimize Prompt'}
        </button>
      </div>
    </div>
  );
};
