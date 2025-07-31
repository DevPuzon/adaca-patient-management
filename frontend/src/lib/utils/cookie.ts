export const cookie = {
  set: (key: string, value: string, days = 7) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${key}=${encodeURIComponent(
      value
    )}; expires=${expires.toUTCString()}; path=/`;
  },

  get: (key: string): string | null => {
    const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  },

  remove: (key: string) => {
    document.cookie = `${key}=; Max-Age=0; path=/`;
  },

  has: (key: string): boolean => {
    return document.cookie.includes(`${key}=`);
  },
};
