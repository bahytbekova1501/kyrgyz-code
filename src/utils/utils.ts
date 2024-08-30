export const BASE_URL = "https://islambratan.pythonanywhere.com/";
export const getLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};
