import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'

import "./index.css"
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
