import axios from 'axios';
const URL = process.env.URL_API + '/category';

export const getCategory = () => {
  return axios.get(URL);
};
