export const getEnvs = () => ({
  VITE_MODE: import.meta.env.VITE_MODE, // testing
  VITE_API_URL: import.meta.env.VITE_API_URL,
});
