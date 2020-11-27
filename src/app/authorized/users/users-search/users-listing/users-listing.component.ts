import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ParseService} from '../../../../shared/parsers/parse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserShort} from '../../../../shared/models/UserShort';
import {UsersListingService} from './service/users-listing.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UsersListingRequest} from '../../../../shared/models/request/UsersListingRequest';
import {Subscription} from 'rxjs';
import {IusersListingResponse} from '../../../../shared/models/response/interfaces/iusers-listing-response';
import {IuserShort} from '../../../../shared/models/interfaces/iuserShort';
import {SessionService} from '../../../../shared/services/session.service';

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

  isLoadingUsers;

  loadedUsersListing: [IuserShort];

  oldUserListingCount = -1;


  // Subscriptions
  private subscriptions = new Subscription();

  usersTableHeaders = ['Obszary', 'ID', 'Imię i nazwisko', 'Rola'];
  expandedUserShort: UserShort | null;

  constructor(private userListingService: UsersListingService,
              public parseService: ParseService,
              private sessionService: SessionService,
              private translate: TranslateService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    const newListingSub = this.activatedRoute.queryParamMap
      .subscribe(params => {

        const newListingRequest = new UsersListingRequest(
          params.has('areas') ? params.getAll('areas').map(Number) : this.userListingService.loadEligibleAreas(this.sessionService.getUserState(), this.sessionService.getUserAreas()),
          params.has('orderBy') ? +params.get('orderBy') : 0,
          params.has('roles') ?  params.getAll('roles').map(Number) : null,
          params.has('currentStartIndex') ?  +params.get('currentStartIndex') : 0,
        params.has('currentPageSize') ?  +params.get('currentPageSize') : 10);

        console.log(newListingRequest);
        this.loadFilteredUsers(newListingRequest);

      });

    this.subscriptions.add(newListingSub);
  }

  loadFilteredUsers(request: UsersListingRequest){
    this.isLoadingUsers = true;

    this.userListingService.loadUserOverallList(request)
      .then( (usersList: IusersListingResponse) => {
          this.isLoadingUsers = false;

          if (usersList.userCount > 0){
            this.loadedUsersListing = usersList.userList;
          } else {
            this.loadedUsersListing = null;
          }
          this.updateLoadedUsersCount(usersList.userCount);
        },
        failure => {
          this.isLoadingUsers = false;
          this.loadedUsersListing = null;
        });
  }

  updateLoadedUsersCount(count: number){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        currentUsersCount: count.toString(),
      },
      queryParamsHandling: 'merge'
    });
  }

  openProfileViewById(userId: number){
    this.router.navigate(['user'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        userId: userId.toString(),
        activeTab: '0'
      },
    });
  }


}
