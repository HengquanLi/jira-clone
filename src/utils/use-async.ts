import { useState } from 'react';

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

//useAuth hook to handle loading status and error
export const useAsync = <D>(initialState?: State<D>,initialConfig?:typeof defaultConfig) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null,
    });

  // run to active asynchronous request
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('Please pass Promise type data');
    }
    setState({ ...state, stat: 'loading' });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if(config.throwOnError) {}
        return Promise.reject(error);
        return error
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
    ...state,
  };
};
