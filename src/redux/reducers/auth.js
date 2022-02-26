import {ACTION_STRING} from '../actions/actionString';
// import { ActionType } from "redux-promise-middleware";

const initialState = {
  userData: {
    token: '',
    id: '',
    photo: '',
    roles: '',
  },

  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};
const authReducer = (prevState = initialState, action) => {
  const {authLogin, authUserPhoto, pending, fulfilled, rejected} =
    ACTION_STRING;
  switch (action.type) {
    case authLogin + pending:
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    // case authLogin.concat("_", Fulfilled):
    case authLogin + fulfilled:
      const data = action.payload.data;
      console.log('login fullfiled', data);
      const userData = {
        ...prevState.userData,
        token: data.data.token,
        photo: data.data.photo,
        roles: data.data.roles,
        id: data.data.id,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };
    case authLogin + rejected:
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    case authUserPhoto:
      const newPhoto = action.payload;
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          photo: newPhoto,
        },
      };

    default:
      return prevState;
  }
};

export default authReducer;
