import { useCallback, useReducer, useState } from 'react';
import { useMountedRef } from 'utils';

//State interface
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

//default State
const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

//useAuth hook to handle loading status and error
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  // const [state, setState] = useState<State<D>>({
  //   ...defaultInitialState,
  //   ...initialState,
  // });
  // const mountedRef = useMountedRef();
  //reactjs.org/docs/hooks-reference.html#usestate. Lazy initail state

  const safeDispatch = useSafeDispatch(dispatch);

  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    safeDispatch({
      data,
      stat: 'success',
      error: null,
    });

  const setError = (error: Error) =>
    safeDispatch({
      error,
      stat: 'error',
      data: null,
    });

  // run to active asynchronous request
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error('Please pass Promise type data');
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    safeDispatch({ stat: 'loading' });
    return promise
      .then((data) => {
        //if component is unmounted then stop data setting
       setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) {
        }
        return Promise.reject(error);
        // return error
      });
  };
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
