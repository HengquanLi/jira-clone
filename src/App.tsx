import AuthenticatedApp from 'AuthenticatedApp';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import FullPageErrorFallback from 'components/fullPageErrorFallback/FullPageErrorFallback';
import { useAuth } from 'context/auth-context';
import React from 'react';
import './App.css';
import UnAuthenticatedApp from './unauthenticated-app/UnAuthenticatedApp';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
