import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isSidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {}

}
