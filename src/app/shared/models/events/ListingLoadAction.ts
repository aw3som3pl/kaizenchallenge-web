import {EeventActionEnum} from '../../enums/Eevent-action.enum';

export class ListingLoadAction {

  public actionStatus: EeventActionEnum;
  public loadedSubmissionsCount: number;
  public totalSubmissionsCount: number;

  constructor(actionStatus: EeventActionEnum, loadedSubmissionsCount: number, totalSubmissionsCount: number) {
    this.actionStatus = actionStatus;
    this.loadedSubmissionsCount = loadedSubmissionsCount;
    this.totalSubmissionsCount = totalSubmissionsCount;
  }

}
