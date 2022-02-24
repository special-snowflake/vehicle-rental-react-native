import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/Login';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
};

export default Router;
