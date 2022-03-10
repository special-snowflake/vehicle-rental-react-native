import axios from 'axios';
const URL = process.env.URL_API + '/city';

export const getCity = () => {
  return axios.get(URL);
};
