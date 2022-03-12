import {ACTION_STRING} from '../actions/actionString';

const initialState = {
  keyword: '',
  city: '',
  category: '',
  orderBy: '',
  sort: 'asc',
  priceMin: 0,
  priceMax: 15000000,
  page: 1,
  limit: 5,
};

const filterReducer = (prevState = initialState, action) => {
  const {changeFilter, resetFilter} = ACTION_STRING;

  switch (action.type) {
    case changeFilter: {
      return {
        ...prevState,
        ...action.payload,
      };
    }
    case resetFilter: {
      return {
        ...initialState,
      };
    }
    default:
      return prevState;
  }
};
export default filterReducer;
