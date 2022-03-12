import {combineReducers} from 'redux';
import authReducer from './auth';
import filterReducer from './filter';
import {ACTION_STRING} from '../actions/actionString';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
});

// remove persist when logout
const rootReducer = (state, action) => {
  if (action.type === ACTION_STRING.authLogout) {
    AsyncStorage.removeItem('vehicleRental').catch(err => {
      console.log(err);
    });
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
