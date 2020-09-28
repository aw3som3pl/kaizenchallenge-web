
export interface IauthorizedUser {
  uid: number;
  name: string;
  surname: string;
  receivedLikeCount: number;
  commentCount: number;
  thumbnailUrl: string;
  experience: number;
  role: number;
  permissions: [];
  activeNotificationsCount: number;
  areas: [];
  problemCount: number;
  upgradeCount: number;
}
