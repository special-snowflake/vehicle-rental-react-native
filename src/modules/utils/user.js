import axios from 'axios';
const URL = process.env.URL_API + '/user';

export const updateUser = (body, token) => {
  return axios.patch(URL, body, {
    headers: {
      'x-authorized-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserDetail = id => {
  const urlGet = URL + '/detail/' + id;
  return axios.get(urlGet);
};
