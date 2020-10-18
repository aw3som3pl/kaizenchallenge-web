import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../service/users.service';
import {SessionService} from '../../../shared/services/session.service';
import {ParseService} from '../../../shared/parsers/parse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {



  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  // Search form
  userSearchForm: FormGroup;

  areasValid: AbstractControl;
  rolesValid: AbstractControl;
  orderByExpValid: AbstractControl;
  userIdValid: AbstractControl;


  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder,
              public usersService: UsersService,
              public sessionService: SessionService,
              public parseService: ParseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.userSearchForm = this.formBuilder.group({
      areas: [''],
      roles: [''],
      orderByExp: [''],
      userId: [''],
    });

    this.userIdValid = this.userSearchForm.controls.userId;
    this.areasValid = this.userSearchForm.controls.areas;
    this.rolesValid = this.userSearchForm.controls.roles;
    this.orderByExpValid = this.userSearchForm.controls.orderByExp;


  }

  ngOnInit(): void {
    this.usersService.enableSearchFilter();

    this.userSearchForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());
    this.userSearchForm.get('roles').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());
    this.userSearchForm.get('orderByExp').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());
    this.userSearchForm.get('userId').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.userSearchFormForceValidAgain());
  }

  userSearchFormForceValidAgain(): void {
    this.areasValid.updateValueAndValidity();
    this.rolesValid.updateValueAndValidity();
    this.orderByExpValid.updateValueAndValidity();
    this.userIdValid.updateValueAndValidity();
  }

  areaArrayPrototype(n: number): any[] {
    return Array(n);
  }

  roleArrayPrototype(n: number): any[] {
    return Array(n);
  }

  orderByExpArrayPrototype(n: number): any[] {
    return Array(n);
  }

  updateSearchFilters() {

  }

  onSearchConfirmed() {
    if (this.userIdValid.value) {
     this.loadUserDetails(this.userIdValid.value);
    } else {

    }
  }

  loadUserDetails(userId: number){
    console.log(userId);
    this.router.navigate(['listing'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        userId: userId.toString()
      }
    });
  }
}
