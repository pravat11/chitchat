import axios from 'axios';

import store from '../store';
import config from '../config';

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

export default http;
