import React from 'react';
import { createRoot } from 'react-dom/client';
import SiteRouter from './SiteRouter.jsx';
import './styles.css';
import './luxury.css';
import './switch.css';
import './resort.css';
import './agro-details.css';
import './resort-details.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteRouter />
  </React.StrictMode>
);