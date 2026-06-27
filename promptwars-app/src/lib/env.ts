export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    console.warn(`[WARNING] Missing environment variable: ${key}`);
  }
  return value || "";
};
