import axios from 'axios';
const URL = process.env.URL_API + '/favourite';

export const addFavourtie = (body, token) => {
  const config = {
    headers: {
      'x-authorized-token': token,
    },
  };
  return axios.post(URL, body, config);
};

export const getFavourtie = token => {
  const config = {
    headers: {
      'x-authorized-token': token,
    },
  };
  return axios.get(URL, config);
};
export const deleteFavourtie = (id, token) => {
  const config = {
    headers: {
      'x-authorized-token': token,
    },
  };
  const urlDelete = URL + '/' + id;
  return axios.delete(urlDelete, config);
};
