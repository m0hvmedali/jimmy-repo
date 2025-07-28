import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';
import { NotificationProvider } from './context/NotificationContext';
createRoot(document.getElementById('root')).render(
  <NotificationProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </NotificationProvider>
)
