import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {IuserFull} from '../../../../shared/models/interfaces/iuserFull';
import {HttpClient} from '@angular/common/http';
import {IsubmissionContent} from '../../../../shared/models/interfaces/isubmission-content';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionSearchService {

  isSearchFilterFolded = false;
  isSearchFilterEnabled = true;

  private _currentSearchPage = new BehaviorSubject(1);
  currentSearchPage = this._currentSearchPage.asObservable();

  private _currentSearchStartIndex = new BehaviorSubject(1);
  currentSearchStartIndex = this._currentSearchStartIndex.asObservable();

  private _currentSearchBatchSize = new BehaviorSubject(10);
  currentSearchBatchSize = this._currentSearchBatchSize.asObservable();

  constructor(private http: HttpClient) { }

  updateCurrentSearchPage(page: number) {
    this._currentSearchPage.next(page);
  }

  updateCurrentSearchStartIndex(index: number) {
    this._currentSearchStartIndex.next(index);
  }

  updateCurrentSearchPageSize(size: number) {
    this._currentSearchBatchSize.next(size);
  }

  toggleSearchFilterFolded() {
    this.isSearchFilterFolded = !this.isSearchFilterFolded;
  }

  disableSearchFilter() {
    this.isSearchFilterEnabled = false;
  }

  enableSearchFilter() {
    this.isSearchFilterEnabled = true;
  }
}
