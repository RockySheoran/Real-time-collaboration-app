import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import toast, { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { Provider } from "react-redux"
import { WindowSizeProvider } from './redux/windowSizeContext';
let persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WindowSizeProvider>

    <App />
        </WindowSizeProvider>
        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            style: {
              zIndex: 99999999, // Increase the z-index value as needed
            },
          }}
        />

      </PersistGate>
    </Provider>
  </>
);
