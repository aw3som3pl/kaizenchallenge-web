import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {SubmissionSearchService} from '../../../home/submission-search/service/submission-search.service';
import {SessionService} from '../../../../shared/services/session.service';
import {ParseService} from '../../../../shared/parsers/parse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';
import {UsersService} from '../../service/users.service';
import {UserShort} from '../../../../shared/models/UserShort';
import {UsersListingService} from './service/users-listing.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SubmissionHistory} from '../../../../shared/models/SubmissionHistory';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersListingComponent implements OnInit {

  loadedUsers: [UserShort];

  usersTableHeaders = ['ID', 'Imię i nazwisko', 'Rola użytkownika', 'Przypisane obszary'];
  usersShortObjectFields = ['id', 'name', 'role', 'areas'];
  expandedUserShort: UserShort | null;

  constructor(private userListingService: UsersListingService,
              public parseService: ParseService,
              private translate: TranslateService) {

  }

  ngOnInit(): void {
    this.preloadUserList();
  }

  preloadUserList(){
    this.userListingService.loadUserOverallList().then( (success: [UserShort]) => {
      this.loadedUsers = success;
    });
  }


}
