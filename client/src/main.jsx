import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import authReducer from "./state";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
 }

 const persistedReducer = persistReducer(persistConfig, authReducer);

 const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
 })

 let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store = {store} >
      <PersistGate loading = {null} persistor = {persistor}>
       <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
