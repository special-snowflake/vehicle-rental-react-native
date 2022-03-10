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

export const updateUsingFetch = (body, token) => {
  return fetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-authorized-token': token,
    },
    body: body,
  }).then(res => console.log(res));
};

export const getUserDetail = id => {
  const urlGet = URL + '/detail/' + id;
  return axios.get(urlGet);
};
