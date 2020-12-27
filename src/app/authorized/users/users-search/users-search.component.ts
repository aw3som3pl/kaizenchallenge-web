import { Component, OnInit } from '@angular/core';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../../shared/services/session.service';
import {ParseService} from '../../../shared/parsers/parse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ArraysService} from '../../../shared/parsers/arrays.service';
import {CustomPaginator} from '../../../shared/configs/PaginatorConfiguration';
import {ResizeService} from '../../../shared/services/resize-service.service';
import {UsersSearchService} from './service/users-search.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class UsersSearchComponent implements OnInit {

  // Subscriptions
  private subscriptions = new Subscription();

  pageSizeOptions: number[] = [20, 30, 40, 60, 100];

  // MatPaginator settings
  isPageSizeHidden = false;
  currentPage = 1;
  currentStartIndex = 0;
  currentPageSize: number;
  currentUsersCount: number;

  // MatPaginator Output
  onPageEvent: PageEvent;

  // Search form
  userSearchForm: FormGroup;

  areasValid: AbstractControl;
  rolesValid: AbstractControl;
  orderByValid: AbstractControl;
  userIdValid: AbstractControl;


  constructor(private resizeService: ResizeService,
              public translate: TranslateService,
              private formBuilder: FormBuilder,
              public usersSearchService: UsersSearchService,
              public sessionService: SessionService,
              public parseService: ParseService,
              public arraysService: ArraysService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.userSearchForm = this.formBuilder.group({
      areas: [null],
      roles: [null],
      orderBy: [null],
      userId: [null],
    });

    this.userIdValid = this.userSearchForm.controls.userId;
    this.areasValid = this.userSearchForm.controls.areas;
    this.rolesValid = this.userSearchForm.controls.roles;
    this.orderByValid = this.userSearchForm.controls.orderBy;

  }

  ngOnInit(): void {

    const newPageSizeSub = this.resizeService.onResize$.subscribe( size => {
      this.isPageSizeHidden = size < 1;
    });

    this.usersSearchService.enableSearchFilter();

    this.userSearchForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());
    this.userSearchForm.get('roles').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());
    this.userSearchForm.get('orderBy').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());
    this.userSearchForm.get('userId').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());

    const newListingUsers = this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.userSearchForm.reset();
        params.has('areas') ? this.userSearchForm.get('areas').setValue(params.getAll('areas').map(Number)) : this.userSearchForm.get('areas').setValue(null);
        params.has('roles') ? this.userSearchForm.get('roles').setValue(params.getAll('roles').map(Number)) : this.userSearchForm.get('roles').setValue(null);
        params.has('orderBy') ? this.userSearchForm.get('orderBy').setValue(+params.get('orderBy')) : this.userSearchForm.get('orderBy').setValue(4);
        params.has('currentPage') ? this.currentPage = +params.get('currentPage') : this.currentPage = 1;
        params.has('currentStartIndex') ? this.currentStartIndex = +params.get('currentStartIndex') : this.currentStartIndex = 0;
        params.has('currentPageSize') ? this.currentPageSize = +params.get('currentPageSize') : this.currentPageSize = 20;
        params.has('currentUsersCount') ? this.currentUsersCount = +params.get('currentUsersCount') : this.currentUsersCount = null;
      });

    this.subscriptions.add(newPageSizeSub);
    this.subscriptions.add(newListingUsers);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  userSearchFormForceValidAgain(): void {
    this.areasValid.updateValueAndValidity();
    this.rolesValid.updateValueAndValidity();
    this.orderByValid.updateValueAndValidity();
    this.userIdValid.updateValueAndValidity();
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

  onSearchConfirmed() {
    if (this.userIdValid.value) {
     this.loadUserDetailsById(this.userIdValid.value);
    } else {
      this.loadUserListByParams();
    }
  }

  loadUserDetailsById(userId: string){
    console.log(userId);
    this.router.navigate(['user'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        userId: userId.toString()
      }
    });
  }

  loadUserListByParams(){
    this.router.navigate(['listing'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        areas: this.areasValid ? this.areasValid.value : Array.from(Array(21).keys()),
        roles: this.rolesValid ? this.rolesValid.value : Array.from(Array(5).keys()),
        orderBy: this.orderByValid ? this.orderByValid.value : null,
        currentPage: this.currentPage ? this.currentPage : 1,
        currentStartIndex: this.currentStartIndex ? this.currentStartIndex : 0,
        currentPageSize: this.currentPageSize ? this.currentPageSize : 20,
        currentUsersCount: this.currentUsersCount ? this.currentUsersCount : null
      }
    });
  }

  onSearchUserPageEvent(event: PageEvent){
    this.currentStartIndex = (event.pageIndex * event.pageSize);
    this.currentPageSize = event.pageSize;
    this.loadUserListByParams();
  }

}
