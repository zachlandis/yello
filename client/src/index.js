import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './context/user';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);