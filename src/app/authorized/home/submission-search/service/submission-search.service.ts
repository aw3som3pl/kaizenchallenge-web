import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmissionSearchService {

  isSearchFilterFolded = true;
  isSearchFilterEnabled = true;

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
