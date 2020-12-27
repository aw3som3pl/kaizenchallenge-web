import {IuserFull} from './interfaces/iuserFull';
import {IrankingUser} from './interfaces/iranking-user';

export class RankingUser implements IrankingUser{

  public employeeId: string;
  public id: number;
  public name: string;
  public experience: number;
  public problemCount: number;
  public upgradeCount: number;
  public areas: [];
  public role: number;

}
