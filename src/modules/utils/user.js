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

export const updateUsingFetch = async (body, token) => {
  const res = await fetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-authorized-token': token,
    },
    body: body,
  });
  return res;
};

export const getUserDetail = id => {
  const urlGet = URL + '/detail/' + id;
  // console.log('host', urlGet);
  return axios.get(urlGet);
};
