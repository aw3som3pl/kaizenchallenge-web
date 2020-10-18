import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {SubmissionSearchService} from '../../../home/submission-search/service/submission-search.service';
import {SessionService} from '../../../../shared/services/session.service';
import {ParseService} from '../../../../shared/parsers/parse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {


  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  // Search form
  searchForm: FormGroup;

  areasValid: AbstractControl;
  categoryValid: AbstractControl;
  statusValid: AbstractControl;
  orderByValid: AbstractControl;
  startDateValid: AbstractControl;
  endDateValid: AbstractControl;
  submissionIdValid: AbstractControl;


  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder,
              public submissionSearchService: SubmissionSearchService,
              public sessionService: SessionService,
              public parseService: ParseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.searchForm = this.formBuilder.group({
      areas: [''],
      category: [''],
      status: [''],
      orderBy: [''],
      startDate: [''],
      endDate: [''],
      submissionId: [''],
    });

    this.areasValid = this.searchForm.controls.areas;
    this.categoryValid = this.searchForm.controls.category;
    this.statusValid = this.searchForm.controls.status;
    this.orderByValid = this.searchForm.controls.orderBy;
    this.startDateValid = this.searchForm.controls.startDate;
    this.endDateValid = this.searchForm.controls.endDate;
    this.submissionIdValid = this.searchForm.controls.submissionId;

  }

  ngOnInit(): void {
    this.submissionSearchService.enableSearchFilter();

    this.searchForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('category').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('status').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('orderBy').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('startDate').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('endDate').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('submissionId').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
  }

  searchFormForceValidAgain(): void {
    this.areasValid.updateValueAndValidity();
    this.categoryValid.updateValueAndValidity();
    this.statusValid.updateValueAndValidity();
    this.orderByValid.updateValueAndValidity();
    this.startDateValid.updateValueAndValidity();
    this.endDateValid.updateValueAndValidity();
    this.submissionIdValid.updateValueAndValidity();
  }

  areaArrayPrototype(n: number): any[] {
    return Array(n);
  }

  categoryArrayPrototype(n: number): any[] {
    return Array(n);
  }

  statusArrayPrototype(n: number): any[] {
    return Array(n);
  }

  orderByArrayPrototype(n: number): any[] {
    return Array(n);
  }

  updateSearchFilters() {

  }
}
