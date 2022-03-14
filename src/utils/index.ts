import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
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
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

//A hook to delay sent request when typing. <Type> => Generic Type
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

//test custom array operation hook
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex:(index:number)=>{
      const arrayCopy = [...value]
      arrayCopy.splice(index,1)
      setValue(arrayCopy)
    }
}};
