import {ACTION_STRING} from './actionString';

export const changeFilter = body => {
  return {
    type: ACTION_STRING.changeFilter,
    payload: body,
  };
};

export const resetFilterSearch = () => {
  return {
    type: ACTION_STRING.resetFilter,
  };
};
