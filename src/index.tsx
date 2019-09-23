import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

const root = document.querySelector('#root');
render(<App />, root);
