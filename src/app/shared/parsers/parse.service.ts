import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';
import * as moment from 'moment/moment';
import {Erole} from '../enums/Erole.enum';
import {EsubmissionStatusEnum} from '../enums/Esubmission-status.enum';
import {MatPaginator} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() { }

  parseType(type: number): string {
    return 'Shared.submissionTypeArray.' + type;
  }

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
    return 'Shared.submissionStatusArray.' + status;
  }

  parseAdditionalUnit(unit: number): string {
    return 'Shared.additionalUnitArray.' + unit;
  }

  parseOrderBy(orderBy: number): string {
    return 'Shared.orderByArray.' + orderBy;
  }

  parseAuthorType(author: number): string {
    return 'Shared.submissionSourceArray.' + author;
  }

  parseResultsType(type: number): string {
    return 'Shared.resultsType.' + type;
  }

  parseTimestampToDate(timestamp: string): string {
    if (timestamp) {
      const date = moment.utc(timestamp).local();
      return date.format('DD/MM/YYYY HH:mm');
    } else {
      return '';
    }
  }

  calculateStarCount(exp: number): number{
    if ( exp < 400){
      return 0;
    } else if (exp < 800 ){
      return 1;
    } else if (exp < 1600){
      return 2;
    } else if (exp < 3200){
      return 3;
    } else if (exp < 6400){
      return 4;
    } else {
      return 5;
    }
  }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = '';
    paginator._intl.itemsPerPageLabel = 'Załaduj: ';
    paginator._intl.lastPageLabel = '';
    paginator._intl.nextPageLabel = '';
    paginator._intl.previousPageLabel = '';
  }

  parseRoleChipDisplayStyle(role: number): { [klass: string]: any|null } {

    const r = Erole;

    switch (role) {
      case r.USER:
        return { 'background-color': 'var(--USER)', 'color': 'var(--white)'};
      case r.LEADER:
        return { 'background-color': 'var(--LEADER)', 'color': 'var(--white)'};
      case r.SUPERVISOR:
        return { 'background-color': 'var(--SUPERVISOR)'};
      case r.COORDINATOR:
        return { 'background-color': 'var(--COORDINATOR)'};
      case r.ADMIN:
        return { 'background-color': 'var(--ADMIN)', 'color': 'var(--white)'};
      case r.SYS_ADMIN:
        return { 'background-color': 'var(--SYS_ADMIN)'};
    }
  }

  parseHistoryAndReviewStatusChipDisplayStyle(status: number): { [klass: string]: any|null } {

    const s = EsubmissionStatusEnum;

    switch (status) {
      case s.NOWE_ZGLOSZENIE:
        return { 'background-color': 'var(--NOWE_ZGLOSZENIE)', 'color': 'var(--black)'};
      case s.EDYCJA:
        return { 'background-color': 'var(--EDYCJA)', 'color': 'var(--white)'};
      case s.DO_SPRAWDZENIA_LIDER:
        return { 'background-color': 'var(--DO_SPRAWDZENIA_LIDER)', 'color': 'var(--white)'};
      case s.ZATWIERDZONO_LIDER:
        return { 'background-color': 'var(--ZATWIERDZONO_LIDER)', 'color': 'var(--white)'};
      case s.DO_SPRAWDZENIA_KIEROWNIK:
        return { 'background-color': 'var(--DO_SPRAWDZENIA_KIEROWNIK)', 'color': 'var(--black)'};
      case s.ZATWIERDZONO_KIEROWNIK:
        return { 'background-color': 'var(--ZATWIERDZONO_KIEROWNIK)', 'color': 'var(--black)'};
      case s.DO_SPRAWDZENIA_KOORDYNATOR:
        return { 'background-color': 'var(--DO_SPRAWDZENIA_KOORDYNATOR', 'color': 'var(--white)'};
      case s.ZATWIERDZONO_KOORDYNATOR:
        return { 'background-color': 'var(--ZATWIERDZONO_KOORDYNATOR)', 'color': 'var(--white)'};
      case s.WDROZONE:
        return { 'background-color': 'var(--WDROZONE)', 'color': 'var(--black)'};
      case s.ROZWIAZANY:
        return { 'background-color': 'var(--ROZWIAZANY)', 'color': 'var(--black)'};
      case s.ARCHIWUM:
        return { 'background-color': 'var(--ARCHIWUM)', 'color': 'var(--lightgrey)'};
      case s.DO_POPRAWY:
        return { 'background-color': 'var(--DO_POPRAWY)', 'color': 'var(--white)'};
      case s.ZMIANA_RECENZENTA:
        return { 'background-color': 'var(--ZMIANA_RECENZENTA)', 'color': 'var(--white)'};
    }
  }

  parseSubmissionStatusChipDisplayStyle(status: number): { [klass: string]: any|null } {

    const s = EsubmissionStatusEnum;

    switch (status) {
      case s.NOWE_ZGLOSZENIE:
        return { 'border-color': 'var(--NOWE_ZGLOSZENIE)', 'color': 'var(--black)'};
      case s.EDYCJA:
        return { 'border-color': 'var(--EDYCJA)', 'color': 'var(--black)'};
      case s.DO_SPRAWDZENIA_LIDER:
        return { 'border-color': 'var(--DO_SPRAWDZENIA_LIDER)', 'color': 'var(--black)'};
      case s.ZATWIERDZONO_LIDER:
        return { 'border-color': 'var(--ZATWIERDZONO_LIDER)', 'color': 'var(--black)'};
      case s.DO_SPRAWDZENIA_KIEROWNIK:
        return { 'border-color': 'var(--DO_SPRAWDZENIA_KIEROWNIK)', 'color': 'var(--black)'};
      case s.ZATWIERDZONO_KIEROWNIK:
        return { 'border-color': 'var(--ZATWIERDZONO_KIEROWNIK)', 'color': 'var(--black)'};
      case s.DO_SPRAWDZENIA_KOORDYNATOR:
        return { 'border-color': 'var(--DO_SPRAWDZENIA_KOORDYNATOR', 'color': 'var(--black)'};
      case s.ZATWIERDZONO_KOORDYNATOR:
        return { 'border-color': 'var(--ZATWIERDZONO_KOORDYNATOR)', 'color': 'var(--black)'};
      case s.WDROZONE:
        return { 'border-color': 'var(--WDROZONE)', 'color': 'var(--black)'};
      case s.ROZWIAZANY:
        return { 'border-color': 'var(--ROZWIAZANY)', 'color': 'var(--black)'};
      case s.ARCHIWUM:
        return { 'border-color': 'var(--ARCHIWUM)', 'color': 'var(--black)'};
      case s.DO_POPRAWY:
        return { 'border-color': 'var(--DO_POPRAWY)', 'color': 'var(--black)'};
      case s.ZMIANA_RECENZENTA:
        return { 'border-color': 'var(--ZMIANA_RECENZENTA)', 'color': 'var(--black)'};
    }
  }


}
