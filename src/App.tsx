import React from 'react';

import './App.css';

import { Test } from './components';
import { useAuth } from 'context/auth-context';
import AuthenticatedApp from 'AuthenticatedApp';
import UnAuthenticatedApp from './unauthenticated-app/UnAuthenticatedApp';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
