import React from 'react';
import './index.css';
import App from './App.js';
import { createRoot } from 'react-dom/client';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);

