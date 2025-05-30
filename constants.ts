
export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
export const LOCAL_STORAGE_THEME_KEY = 'promptOptimizerTheme';

// It's crucial that process.env.API_KEY is replaced by a build tool (e.g., Vite with import.meta.env.VITE_API_KEY)
// For this exercise, we directly use process.env.API_KEY as instructed.
// In a real client-side app, this key should not be exposed directly.
// A backend proxy is the standard secure method.
export const API_KEY = process.env.API_KEY;
