
import {IusersListingRequest} from './interfaces/iusers-listing-request';

export class UsersListingRequest implements IusersListingRequest{

  areas: number[] | null;
  orderBy: number;
  roles: number[] | null;
  batchSize: number;
  startIndex: number;

  constructor(areas: number[], orderBy: number, roles: number[], startIndex: number, batchSize: number) {
    this.areas = areas;
    this.roles = roles;
    this.orderBy = orderBy;
    this.batchSize = batchSize;
    this.startIndex = startIndex;
  }
}
