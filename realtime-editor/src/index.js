import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import toast, { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { Provider } from "react-redux"
let persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    <Toaster position="top-right"
      reverseOrder={true} />
      </PersistGate>
    </Provider>
  </>
);
