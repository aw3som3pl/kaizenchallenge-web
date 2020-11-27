import {IuserFull} from './interfaces/iuserFull';
import {Ireviewer} from './interfaces/ireviewer';
import {IsubmissionHistory} from './interfaces/isubmission-history';

export class SubmissionHistory implements IsubmissionHistory{

  entityName: string;
  historyStatus: number;
  userId: number;
  userEmployeeId: string;
  userRole: number;
  timestampCreated: string;

  constructor(init?: Partial<SubmissionHistory>) {
    Object.assign(this, init);
  }

}
