const config = {
  // baseURL: 'http://localhost:8848/api',
  baseURL: 'https://intense-sands-36022.herokuapp.com/api',
  apis: {
    login: '/login',
    sendMessage: '/send-message',
    validateSession: '/validate-session',
    fetchFriends: '/user/{userId}/friends',
    getChatMessages: 'friendship/{friendshipId}/chat-messages'
  },
  pusher: {
    key: '96872f3207c2fdf6922b',
    appId: '493850',
    secret: 'fd6e21bfed4e30c0b29b',
    cluster: 'ap2'
  }
};

export default config;
