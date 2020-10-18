import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isSearchFilterFolded = false;
  isSearchFilterEnabled = true;

  constructor(private http: HttpClient) { }

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
