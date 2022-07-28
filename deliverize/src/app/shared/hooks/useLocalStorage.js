import { useState } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  })

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)

    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(valueToStore))
    }
  }

  return [storedValue, setValue]

}