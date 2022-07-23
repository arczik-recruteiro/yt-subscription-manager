import { StrictMode } from 'react';
import App from './App.container';
import { createRoot } from 'react-dom/client';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
