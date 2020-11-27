import { Injectable } from '@angular/core';
import {SessionService} from '../../../../../../shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private sessionService: SessionService) { }

}
