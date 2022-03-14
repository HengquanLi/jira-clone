import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ListPage, Login } from './page';

import { Test } from './components';

function App() {
  return (
    <div className="App">
      <ListPage />
      <Login />
    </div>
  );
}

export default App;
