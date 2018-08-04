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
  const session = store.getState().session;

  if (session && session.token) {
    request.headers['token'] = session.token;
  }

  return request;
});

export default http;
