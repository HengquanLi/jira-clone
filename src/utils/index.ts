import { useEffect, useRef, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (isVoid(value)) {
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

//custom array operation hook
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const arrayCopy = [...value];
      arrayCopy.splice(index, 1);
      setValue(arrayCopy);
    },
  };
};

//a hook to change title content when

export const useDocumentTitle = (
  title: string,
  keepOnMount: boolean = true
) => {
  
  const initialTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnMount) document.title = initialTitle;
    };
  }, [initialTitle, keepOnMount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
