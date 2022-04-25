import { useEffect, useMemo, useRef, useState } from 'react';
import { useSetUrlSearchParams, useUrlQueryParam } from 'utils/url';
import { useGetProject } from './project';

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

//a hook to set title content 

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

//a hook to get project list param
export const useProjectsSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParam();
  return ['projects', params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId',
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingProject, isLoading } = useGetProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
/**
 * return component mounting status, if not mounted or unmounted return false, otherwise return true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
