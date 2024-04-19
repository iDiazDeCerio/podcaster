export const storageHelper = {
  store: (key: string, data: string) => {
    const expiryKey = `expiryFor-${key}`;
    const now = new Date();
    const dateAfter24H = new Date((now.getTime() + 86400000)) // a day in ms
    localStorage.setItem(key, data);
    localStorage.setItem(expiryKey, dateAfter24H.toDateString())
  },
  load: (key: string) => localStorage.getItem(key),
  isExpired: (key: string) => {
    const expiryKey = `expiryFor-${key}`;
    const now = new Date();
    const expiryDate = new Date(localStorage.getItem(expiryKey))
    return expiryDate < now;
  }
}