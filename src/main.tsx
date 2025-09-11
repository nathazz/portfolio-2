import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import React from 'react';
import './index.css';
import './i18n/i18n.ts';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
