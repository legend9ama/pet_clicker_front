import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
window.Telegram.WebApp.disableVerticalSwipes()	

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
