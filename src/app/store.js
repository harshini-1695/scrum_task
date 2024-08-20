import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ticketsReducer from './ticketsSlice';

// Configure persistence to avoid deletion of stored values on redirect/referesh
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, ticketsReducer);

const store = configureStore({
  reducer: {
    tickets: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

