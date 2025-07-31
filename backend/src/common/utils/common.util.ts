export const environment = (variable: string) => {
  const data = process.env[variable];
  if (data.length) {
    console.error('No environment variable for:', variable);
  }
  return data;
};
