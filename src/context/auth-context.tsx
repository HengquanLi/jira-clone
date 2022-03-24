import FullPageLoading from 'components/fullPageLoading/FullPageLoading';
import { User } from 'components/searchPanel/SearchPanel';
import React, { ReactNode, useState } from 'react';
import { useMount } from 'utils';
import { http } from 'utils/http';
import { useAsync } from 'utils/use-async';
import * as auth from 'auth-provider';
import FullPageErrorFallback from 'components/fullPageErrorFallback/FullPageErrorFallback';

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  
  const login = (form: AuthForm) =>
    // auth.login(form).then((user) => setUser(user)); Or below statement
    auth.login(form).then(setUser);
  const register = (form: AuthForm) =>
    // auth.register(form).then((user) => setUser(user));
    auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser())
  });

  if(isIdle||isLoading){
    return <FullPageLoading />
  }

  if(isError){
    return <FullPageErrorFallback error={error}/>
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used in AuthProvider.');
  }
  return context;
};
