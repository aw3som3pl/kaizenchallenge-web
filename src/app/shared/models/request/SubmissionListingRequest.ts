
import {IsubmissionListingRequest} from './interfaces/isubmission-listing-request';

export class SubmissionListingRequest implements IsubmissionListingRequest{

  areas: number[];
  authorType: number;
  batchSize: number;
  category: number[];
  orderBy: number[];
  startIndex: number;
  status: number[];
  timestampSearchEnd: string;
  timestampSearchStart: string;
  type: number[];
  employeeId: string;

  constructor(areas: number[], authorType: number, batchSize: number, category: number[], orderBy: number[], startIndex: number, status: number[], timestampSearchEnd: string, timestampSearchStart: string, type: number[], employeeId: string) {
    this.areas = areas;
    this.authorType = authorType;
    this.batchSize = batchSize;
    this.category = category;
    this.orderBy = orderBy;
    this.startIndex = startIndex;
    this.status = status;
    this.timestampSearchEnd = timestampSearchEnd;
    this.timestampSearchStart = timestampSearchStart;
    this.type = type;
    this.employeeId = employeeId;

    if (type) {
      if (type.length > 1) {
        this.type = null;
      }
    }
  }
}
