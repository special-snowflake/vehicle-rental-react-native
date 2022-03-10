// import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, View, Text} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import Toast from 'react-native-toast-message';

const VehicleRental = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Toast />
        <Router />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => VehicleRental);
