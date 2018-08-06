import axios from 'axios';

import config from '../config';
import { logout } from '../actions/auth';
import store, { purgeStore } from '../store';

const http = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(request => {
  const sessionData = store.getState().session.data;

  if (sessionData && sessionData.token) {
    request.headers['token'] = sessionData.token;
  }

  return request;
});

http.interceptors.response.use(
  response => response,

  async error => {
    if (error.response && error.response.status === 401) {
      await purgeStore();
      store.dispatch(logout());

      return;
    }

    return Promise.reject(error);
  }
);

export default http;
