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
  loadAllUsersDataEndpointURL: '/api/search/SearchUsers',
  loadFilteredSubmissionsListDataEndpointURL: '/api/search/GetSubmissions',
  sendNewLikeActionEndpointURL: '/api/submission/UpdateSubmission/Like',
  sendNewCommentEndpointURL: '/api/submission/UpdateSubmission/CreateComment',
  getSubmissionAttachmentsEndpointURL: '/api/submission/GetAttachments',
  loadSubmissionCommentsEndpointURL: '/api/submission/GetComments',
  loadSubmissionLikesEndpointURL: '/api/submission/GetLikes',
  getActiveNotificationsCountEndpointURL: '/api/Notifications/GetNotifications',
  updateUnreadNotificationsCountEndpointURL: '/api/Notifications/GetUnreadNotificationCount',
  markNotificationsAsReadEndpointURL: '/api/Notifications/MarkAsRead',
  fetchEmployeeDataEndpointURL: '/api/user/GetUser',
  updateUserDataEndpointURL: '/api/admin/UpdateUser',
  loadCreativityRankingListEndpointURL: '/api/statistics/GetMostActiveUsers'
};
