const config = {
  // baseURL: 'http://localhost:8848/api',
  baseURL: 'https://intense-sands-36022.herokuapp.com/api',
  apis: {
    sendMessage: '/send-message'
  },
  pusher: {
    key: '96872f3207c2fdf6922b',
    appId: '493850',
    secret: 'fd6e21bfed4e30c0b29b',
    cluster: 'ap2'
  }
};

export default config;
