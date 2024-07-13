import React from 'react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Auth0ProviderWithNavigate} from "./auth0-provider-with-navigation";
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
