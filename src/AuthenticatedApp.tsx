import { useAuth } from 'context/auth-context';
import { ListPage } from 'page';
import React from 'react';

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ListPage />
    </div>
  );
};

export default AuthenticatedApp;
