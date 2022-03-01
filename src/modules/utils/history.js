import axios from 'axios';
const URL = process.env.URL_API + '/history';

export const searchHistory = (filter, token) => {
  //   const newToken = JSON.parse(token);
  const config = {
    headers: {
      'x-authorized-token': token,
    },
  };
  const searchUrl = URL + `/search?${filter}`;
  return axios.get(searchUrl, config);
};
