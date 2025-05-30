
import React, { useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';


interface OptimizedResultProps {
  optimizedPrompt: string;
}

export const OptimizedResult: React.FC<OptimizedResultProps> = ({ optimizedPrompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedPrompt)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(err => console.error('Failed to copy optimized prompt: ', err));
  };

  return (
    <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">
          Optimized Prompt
        </h2>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-text-muted-light dark:text-text-muted-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-default"
          aria-label="Copy optimized prompt"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
        </button>
      </div>
      <p className="text-text-light dark:text-text-dark whitespace-pre-wrap bg-slate-100 dark:bg-slate-800 p-4 rounded-md leading-relaxed">
        {optimizedPrompt}
      </p>
       {copied && (
        <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-right">
          Copied to clipboard!
        </p>
      )}
    </div>
  );
};
