import {IauthorizedUser} from './interfaces/iauthorized-user';

export class AuthorizedUser implements IauthorizedUser{
  public activeNotificationsCount: number;
  public areas: [];
  public commentCount: number;
  public experience: number;
  public name: string;
  public permissions: [];
  public problemCount: number;
  public receivedLikeCount: number;
  public role: number;
  public surname: string;
  public thumbnailUrl: string;
  public uid: number;
  public upgradeCount: number;

  constructor(init?: Partial<AuthorizedUser>) {
    Object.assign(this, init);
  }
}
