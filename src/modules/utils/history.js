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

export const addHistory = (body, token) => {
  const config = {
    headers: {
      'x-authorized-token': token,
    },
  };
  return axios.post(URL, body, config);
};

export const getHistoryDetail = (id, token) => {
  const config = {
    headers: {
      'x-authorized-token': token,
    },
  };
  const historyDetail = URL + '/' + id;
  return axios.get(historyDetail, config);
};

export const deleteHistory = (body, token) => {
  const config = {
    headers: {
      'x-authorized-token': token,
    },
    data: {historyIds: body.historyIds},
  };
  return axios.delete(URL, config);
};
