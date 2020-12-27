import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ScreenSize} from '../enums/screen-size.enum';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ResizeService {

  get onResize$(): Observable<ScreenSize> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  private resizeSubject: Subject<ScreenSize>;

  constructor() {
    this.resizeSubject = new Subject();
  }

  onResize(size: ScreenSize) {
    this.resizeSubject.next(size);
  }

}
