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
  sendNewSubmissionEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/CreateSubmission',
  getSubmissionContentsEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/GetSubmission',
  getSubmissionReviewsEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/GetReviews',
  sendNewSubmissionReviewDataEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/CreateReview',
  updateSubmissionDataEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/UpdateSubmission',
  loadAllUsersDataEndpointURL: 'https://kaizenonline.azurewebsites.net/api/user/GetUsersOverall',
  loadFilteredSubmissionsListDataEndpointURL: 'https://kaizenonline.azurewebsites.net/api/search/GetSubmissions',
  sendNewLikeActionEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/UpdateSubmission/Like',
  sendNewCommentEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/UpdateSubmission/CreateComment',
  getSubmissionAttachmentsEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/GetAttachments',
  loadSubmissionCommentsEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/GetComments',
  loadSubmissionLikesEndpointURL: 'https://kaizenonline.azurewebsites.net/api/submission/GetLikes',
  getActiveNotificationsCountEndpointURL: 'https://kaizenonline.azurewebsites.net/api/Notifications/GetNotifications'
};
