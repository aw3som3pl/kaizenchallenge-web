import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmissionResultsService {

  isSearchFilterFolded = false;
  isSearchFilterEnabled = true;


  constructor() { }

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
