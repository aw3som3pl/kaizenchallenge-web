
export interface IuserFull {
  uId: number;
  employeeId: string;
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
  state: string;
  lastLogon: string;
  created: string;
  email: string;
}
