import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import rpm from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducers';

// setup persist
const persistConfig = {
  key: 'vehicleRental',
  storage: AsyncStorage,
  whitelist: ['auth'], //state that you want to persist
};
const pReducer = persistReducer(persistConfig, rootReducer);
const enhancers = applyMiddleware(rpm, logger);
const store = createStore(pReducer, enhancers);

const persistor = persistStore(store);

export {persistor, store};
