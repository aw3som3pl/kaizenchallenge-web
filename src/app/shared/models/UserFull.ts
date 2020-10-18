import {IuserFull} from './interfaces/iuserFull';

export class UserFull implements IuserFull{
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
  public uId: number;
  public upgradeCount: number;

  constructor(init?: Partial<UserFull>) {
    Object.assign(this, init);
  }
}
