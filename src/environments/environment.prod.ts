export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyD9q_TpYirkNWFdeBhcFNd47gx4W2NyS4g',
    authDomain: 'kaizenchallenge-demo.firebaseapp.com',
    databaseURL: 'https://kaizenchallenge-demo.firebaseio.com',
    projectId: 'kaizenchallenge-demo',
    storageBucket: 'kaizenchallenge-demo.appspot.com',
    messagingSenderId: '38818715791',
    appId: '1:38818715791:web:451b52b27cc08190feb8fa',
    measurementId: 'G-D32R4V8NNR'
  },
  fetchUserDataEndpointURL: 'https://kaizenonline.azurewebsites.net/api/user/GetUserData',
  registerUserEndpointURL: 'https://kaizenonline.azurewebsites.net/api/admin/CreateUser',
  getReviewerListEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/GetReviewers',
  sendNewSubmissionEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/CreateSubmission'
};
