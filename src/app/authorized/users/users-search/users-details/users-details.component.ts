import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ParseService} from '../../../../shared/parsers/parse.service';
import {MatTabGroup} from '@angular/material/tabs';
import {UsersDetailsService} from './service/users-details.service';
import {UsersSearchService} from '../service/users-search.service';
import {UserFull} from '../../../../shared/models/UserFull';
import {IuserFull} from '../../../../shared/models/interfaces/iuserFull';
import {Subject} from 'rxjs';
import {SubmissionContentUpdate} from '../../../../shared/models/events/SubmissionContentUpdate';
import {EsubmissionContentEditValidityEnum} from '../../../../shared/enums/Esubmission-content-edit-validity.enum';
import {UserDataUpdate} from '../../../../shared/models/events/UserDataUpdate';

@Component({
  selector: 'app-user',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  @ViewChild('submissionTabGroup') submissionTabGroup: MatTabGroup;

  // Subscriptions
  private urlSub: any;

  // Params
  userId: string;
  activeTab: UserViewTab;
  activeTabs = UserViewTab;
  currentActiveTab = this.activeTabs.ACCOUNT_DATA;

  isloadingUser = false;

  loadedUser: UserFull;
  isLiked: boolean;

  // EDIT
  isEditable = false;
  isEditorOpened = false;

  userDataValidityCheck: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public parseService: ParseService,
              public usersSearchService: UsersSearchService,
              public usersDetailsService: UsersDetailsService) {
  }

  ngOnInit(): void {
    this.isEditable = this.usersDetailsService.checkUserEditable();

    this.urlSub = this.activatedRoute.queryParams.subscribe(params => {
      console.log(JSON.stringify(params));
      if (this.userId !== params.userId) {
        this.userId = params.userId;
        this.reloadUserData();
      }
      this.currentActiveTab = +params.activeTab;
    });
  }

  ngOnDestroy() {
    this.usersSearchService.enableSearchFilter();
    this.urlSub.unsubscribe();
  }

  reloadUserData() {
    this.isloadingUser = true;
    this.usersSearchService.disableSearchFilter();
    this.usersDetailsService.reloadUserData(this.userId)
      .then((userData: IuserFull) => {
        console.log(userData);
        this.loadedUser = userData;
        this.isloadingUser = false;
      }, failure => {
        this.isloadingUser = false;
       });
  }

  interceptUserUpdateAction(userDataUpdate: UserDataUpdate){
    if (userDataUpdate.userFormValid) {
      this.usersDetailsService.uploadUserData(userDataUpdate.payload).then(
        success => {
          this.reloadUserData();
        },
          failure => {
          console.log(failure);
        }
      );
    }
  }


  updateTabParam(value: string){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        userId: this.userId,
        activeTab: value
      },
      queryParamsHandling: 'merge'
    });
  }

  toggleEditor(state: boolean) {
    this.isEditorOpened = state;
  }

  onTabChange($event: any){
    this.currentActiveTab = $event.index;
    this.updateTabParam(this.currentActiveTab.toString());
  }

  onBacktoSearch() {
    this.usersSearchService.enableSearchFilter();
    this.router.navigate(['listing'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        userId: null,
        activeTab: null
      },
      queryParamsHandling: 'merge'}
    );
  }

}

enum UserViewTab {
  ACCOUNT_DATA,
  STATISTICS
}
