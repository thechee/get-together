import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf';
import './index.css';
import * as sessionActions from './store/session';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
