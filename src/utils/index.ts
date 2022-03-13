import { useEffect, useState } from 'react';

export const isFalsy = (value:any) => (value === 0 ? false : !value);

export const cleanObject = (obj:object) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {

    //@ts-ignore
    const value = obj[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

//A hook to remove deprecated array(remove [])
export const useMount = (callback:()=>void) => {
  useEffect(() => {
    callback();
  }, []);
};

//A hook to delay sent request when typing
export const useDebounce = (value:any, delay?:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
