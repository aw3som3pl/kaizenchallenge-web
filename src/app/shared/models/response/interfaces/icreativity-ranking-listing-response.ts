import {IrankingUser} from '../../interfaces/iranking-user';

export interface IcreativityRankingListingResponse {
  mostActiveUsers: [IrankingUser];
  userCount: number;
}
