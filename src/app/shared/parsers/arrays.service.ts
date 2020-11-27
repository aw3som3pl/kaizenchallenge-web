import { Injectable } from '@angular/core';
import {SessionService} from '../services/session.service';
import {Erole} from '../enums/Erole.enum';
import {EaccountStateEnum} from '../enums/EaccountState.enum';

@Injectable({
  providedIn: 'root'
})
export class ArraysService {


  private AREA_FIELD_COUNT = 22;
  private CATEGORIES_FIELD_COUNT = 8;
  private STATUS_FIELD_COUNT = 13;
  private SUBMISSION_TYPE_FIELD_COUNT = 2;
  private ADDITIONAL_UNIT_TYPE_FIELD_COUNT = 6;
  private ORDER_BY_SUB_FIELD_COUNT = 5;
  private ORDER_BY_USR_FIELD_COUNT = 6;
  private ORDER_BY_SUBSTAT_FIELD_COUNT = 5;
  private AUTHOR_TYPE_FIELD_COUNT = 3;
  private ROLE_TYPE_FIELD_COUNT = 6;
  private USER_STATUS_TYPE_FIELD_COUNT = 2;

  constructor() { }

  areaArrayPrototype(userState: string, userAreas: number[]): any[] {
    const s = EaccountStateEnum;
    switch (userState) {
      case s.ACTIVE:
        return Array.from(Array(this.AREA_FIELD_COUNT).keys());
      case s.TEST:
        return userAreas;
    }
  }

  categoryArrayPrototype(): any[] {
    return Array.from(Array(this.CATEGORIES_FIELD_COUNT).keys());
  }

  additionalUnitArrayPrototype(): any[] {
    return Array.from(Array(this.ADDITIONAL_UNIT_TYPE_FIELD_COUNT).keys());
  }

  statusArrayPrototype(userRole: Erole): any[] {

    const statusArray = Array.from(Array(this.STATUS_FIELD_COUNT).keys());

    switch (userRole){
      case Erole.COORDINATOR:
      case Erole.SYS_ADMIN:
        statusArray.splice(0, 2); // Bez NOWE_ZGLOSZENIE + EDYCJA
        statusArray.splice(10, 1);
        return statusArray;
      default:
        statusArray.splice(0, 2); // Bez NOWE_ZGLOSZENIE + EDYCJA
        statusArray.splice(8, 1);
        statusArray.splice(9, 1);
        return statusArray;
    }
  }

  typeArrayPrototype(): any[] {
    return Array.from(Array(this.SUBMISSION_TYPE_FIELD_COUNT).keys());
  }

  orderByArrayPrototype_SubmissionSearch(): any[] {
    return Array.from(Array(this.ORDER_BY_SUB_FIELD_COUNT).keys());
  }

  orderByArrayPrototype_UserSearch(): any[] {
    return Array.from(Array(this.ORDER_BY_USR_FIELD_COUNT).keys());
  }

  orderByArrayPrototype_SubmissionStatistics(): any[] {
    return Array.from(Array(this.ORDER_BY_SUBSTAT_FIELD_COUNT).keys());
  }

  roleTypeArrayPrototype_Default(): any[] {
    return Array.from(Array(this.ROLE_TYPE_FIELD_COUNT).keys());
  }

  authorTypeArrayPrototype(): any[] {
    return Array.from(Array(this.AUTHOR_TYPE_FIELD_COUNT).keys());
  }

  userStatusTypeArrayPrototype(): any[] {
    return Array.from(Array(this.USER_STATUS_TYPE_FIELD_COUNT).keys());
  }

}
