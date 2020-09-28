import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() { }

  parseArea(area: number): string {
    return 'Shared.areaArray.' + area;
  }

  parseCategory(category: number): string {
    return 'Shared.categoryArray.' + category;
  }

  parseRole(role: number): string {
    return 'Shared.roleArray.' + role;
  }

  parseStatus(status: number): string {
    return 'Shared.statusArray.' + status;
  }

  parseAdditionalUnit(unit: number): string {
    return 'Shared.additionalUnitArray.' + unit;
  }

  parseTimestampToDate(timestamp: string): string {
    if (timestamp) {
      const format = 'dd/MM/yyyy HH:mm';
      const locale = 'en_US';
      const d = new Date(timestamp);
      return formatDate(d, format, locale);
    } else {
      return '';
    }
  }

}
