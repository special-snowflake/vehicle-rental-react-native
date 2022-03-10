/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Header} from 'react-native/Libraries/NewAppScreen';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import DetailVehicle from './screens/DetailVehicle';
import {NavigationContainer} from '@react-navigation/native';
import History from './screens/History';
import Chat from './screens/Chat';
import {Image, StyleSheet, View} from 'react-native';
import VehicleCategory from './screens/VehicleCategory';
import UpdateProfile from './screens/UpdateProfile';
import SearchVehicle from './screens/SearchVehicle';
import Transaction1 from './screens/Transaction1';
import Transaction2 from './screens/Transaction2';
import Transaction3 from './screens/Transaction3';
import AddVehicle from './screens/AddVehicle';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const iconHome = require('../src/commons/assets/icons/home.png');
const iconHistory = require('../src/commons/assets/icons/history.png');
const iconChat = require('../src/commons/assets/icons/chat.png');
const iconProfile = require('../src/commons/assets/icons/profile.png');

const Auth = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="HomeAuth" component={Home} />
    <Stack.Screen name="SignUpAuth" component={SignUp} />
    <Stack.Screen name="ForgetPasswordAuth" component={Login} />
  </Stack.Navigator>
);

const HomeTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home1"
        component={Home}
        screenOptions={{headerShown: false}}
      />
      <Stack.Screen name="DetailVehicle" component={DetailVehicle} />
      <Stack.Screen name="SearchVehicle" component={SearchVehicle} />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{headerShown: true, title: 'Add new item'}}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="VehicleCategory"
        component={VehicleCategory}
      />
    </Stack.Navigator>
  );
};

const HistoryTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="History1"
        component={History}
        screenOptions={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ChatTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Chat1"
        component={Chat}
        options={{
          title: 'Chat',
          headerShown: true,
        }}
        // screenOptions={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

const ProfileTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile1" component={Profile} />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{title: 'Update Profile', headerShown: true}}
      />
    </Stack.Navigator>
  );
};

const StackTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, tabBarShowLabel: false}}
      style={styles.tabWrapper}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.tabIconWrapper,
                backgroundColor: focused && 'rgba(255, 199, 167, 0.2)',
              }}>
              <Image
                source={iconHome}
                resizeMode="contain"
                resizeMethod="scale"
                style={{
                  tintColor: focused ? '#FFCD61' : '#DFDEDE',
                  ...styles.tabIcon,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.tabIconWrapper,
                backgroundColor: focused && 'rgba(255, 199, 167, 0.2)',
              }}>
              <Image
                source={iconHistory}
                resizeMode="contain"
                resizeMethod="scale"
                style={{
                  tintColor: focused ? '#FFCD61' : '#DFDEDE',
                  ...styles.tabIcon,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.tabIconWrapper,
                backgroundColor: focused && 'rgba(255, 199, 167, 0.2)',
              }}>
              <Image
                source={iconChat}
                resizeMode="contain"
                resizeMethod="scale"
                style={{
                  tintColor: focused ? '#FFCD61' : '#DFDEDE',
                  ...styles.tabIcon,
                }}
              />
            </View>
          ),
          tabBarBadge: 2,
          tabBarBadgeStyle: {backgroundColor: '#393939'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.tabIconWrapper,
                backgroundColor: focused && 'rgba(255, 199, 167, 0.2)',
              }}>
              <Image
                source={iconProfile}
                resizeMode="contain"
                resizeMethod="scale"
                style={{
                  tintColor: focused ? '#FFCD61' : '#DFDEDE',
                  ...styles.tabIcon,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="StackTab" component={StackTab} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen
      name="Transaction1"
      component={Transaction1}
      options={{title: 'Payment', headerShown: true}}
    />
    <Stack.Screen
      name="Transaction2"
      component={Transaction2}
      options={{title: 'Payment', headerShown: true}}
    />
    <Stack.Screen
      name="Transaction3"
      component={Transaction3}
      options={{title: 'Payment', headerShown: true}}
    />
    <Stack.Screen name="HomeAuth" component={Home} />
    <Stack.Screen name="SignUpAuth" component={SignUp} />
    <Stack.Screen name="ForgetPasswordAuth" component={Login} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabWrapper: {
    height: 60,
    borderRadius: 5,
  },
  tabIconWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  tabIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 5,
    height: 25,
    opacity: 1,
    width: 25,
  },
});

export default Router;
