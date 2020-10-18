export const environment = {
  production: true,
  fetchUserDataEndpointURL: '/api/user/GetUserData',
  registerUserEndpointURL: '/api/admin/CreateUser',
  getReviewerListEndpointURL: '/api/submission/GetReviewers',
  sendNewSubmissionEndpointURL: '/api/submission/CreateSubmission',
  getSubmissionContentsEndpointURL: '/api/submission/GetSubmission',
  getSubmissionReviewsEndpointURL: '/api/submission/GetReviews',
  sendNewSubmissionReviewDataEndpointURL: '/api/submission/CreateReview',
  updateSubmissionDataEndpointURL: '/api/submission/UpdateSubmission',
  loadAllUsersDataEndpointURL: '/api/user/GetUsersOverall',
  loadFilteredSubmissionsListDataEndpointURL: '/api/search/GetSubmissions',
  sendNewLikeActionEndpointURL: '/api/submission/UpdateSubmission/Like',
  sendNewCommentEndpointURL: '/api/submission/UpdateSubmission/CreateComment',
  getSubmissionAttachmentsEndpointURL: '/api/submission/GetAttachments',
  loadSubmissionCommentsEndpointURL: '/api/submission/GetComments',
  loadSubmissionLikesEndpointURL: '/api/submission/GetLikes',
  getActiveNotificationsCountEndpointURL: '/api/Notifications/GetNotifications'
};
