import {ACTION_STRING} from './actionString';
import {login} from '../../modules/utils/auth';

export const loginAction = body => {
  return {
    type: ACTION_STRING.authLogin,
    payload: login(body),
  };
};

export const logoutAction = () => {
  return {
    type: ACTION_STRING.authLogout,
  };
};

export const updateUserPhoto = image => {
  return {
    type: ACTION_STRING.authUserPhoto,
    payload: image,
  };
};
