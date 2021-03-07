import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../../shared/services/session.service';
import {ParseService} from '../../../shared/parsers/parse.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {SubmissionSearchService} from './service/submission-search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../shared/adapters/format-datepicker';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {ArraysService} from '../../../shared/parsers/arrays.service';
import {CustomPaginator} from '../../../shared/configs/PaginatorConfiguration';
import {ResizeService} from '../../../shared/services/resize-service.service';

@Component({
  selector: 'app-submission-search',
  templateUrl: './submission-search.component.html',
  styleUrls: ['./submission-search.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class SubmissionSearchComponent implements OnInit, OnDestroy {

  // Subscriptions
  private subscriptions = new Subscription();

  pageSizeOptions: number[] = [20, 30, 40, 60, 100];

  // MatPaginator events
  pageEvent: PageEvent;

  // MatPaginator settings
  isPageSizeHidden = false;
  currentPage = 1;
  currentStartIndex = 0;
  currentPageSize: number;
  currentSubmissionsCount: number;

  // Search form
  searchForm: FormGroup;

  areasValid: AbstractControl;
  categoryValid: AbstractControl;
  statusValid: AbstractControl;
  orderByValid: AbstractControl;
  typeValid: AbstractControl;
  employeeIdValid: AbstractControl;
  dateRangeStartValid: AbstractControl;
  dateRangeEndValid: AbstractControl;
  submissionIdValid: AbstractControl;
  authorTypeValid: AbstractControl;


  constructor(private resizeService: ResizeService,
              public translate: TranslateService,
              private formBuilder: FormBuilder,
              public submissionSearchService: SubmissionSearchService,
              public sessionService: SessionService,
              public parseService: ParseService,
              public arraysService: ArraysService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.onResize(null, window.innerWidth);
    console.log(window.innerWidth);

    this.searchForm = this.formBuilder.group({
      areas: [null],
      category: [null],
      status: [null],
      orderBy: [null],
      type: [null],
      employeeId: [null],
      dateRangeStart: [null],
      dateRangeEnd: [this.getLocalDate()],
      submissionId: [null],
      authorType: [null],
    });

    this.areasValid = this.searchForm.controls.areas;
    this.categoryValid = this.searchForm.controls.category;
    this.statusValid = this.searchForm.controls.status;
    this.orderByValid = this.searchForm.controls.orderBy;
    this.typeValid = this.searchForm.controls.type;
    this.employeeIdValid = this.searchForm.controls.employeeId;
    this.dateRangeStartValid = this.searchForm.controls.dateRangeStart;
    this.dateRangeEndValid = this.searchForm.controls.dateRangeEnd;
    this.submissionIdValid = this.searchForm.controls.submissionId;
    this.authorTypeValid = this.searchForm.controls.authorType;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event? , windowSize?) {
    this.isPageSizeHidden = windowSize ? windowSize < 350 : window.innerWidth < 350;
  }

  ngOnInit(): void {

    this.searchForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('category').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('status').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('orderBy').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('type').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('employeeId').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('dateRangeStart').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('dateRangeEnd').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('submissionId').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());
    this.searchForm.get('authorType').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.searchFormForceValidAgain());

    const newListingSub = this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.searchForm.reset();
        params.has('type') ? this.searchForm.get('type').setValue(params.getAll('type').map(Number)) : this.searchForm.get('type').setValue(null);
        params.has('areas') ? this.searchForm.get('areas').setValue(params.getAll('areas').map(Number)) : this.searchForm.get('areas').setValue(null);
        params.has('category') ? this.searchForm.get('category').setValue(params.getAll('category').map(Number)) : this.searchForm.get('category').setValue(null);
        params.has('status') ? this.searchForm.get('status').setValue(params.getAll('status').map(Number)) : this.searchForm.get('status').setValue(null);
        params.has('timestampSearchStart') ? this.searchForm.get('dateRangeStart').setValue(params.get('timestampSearchStart')) : this.searchForm.get('dateRangeStart').setValue(null);
        params.has('timestampSearchEnd') ? this.searchForm.get('dateRangeEnd').setValue(params.get('timestampSearchEnd')) : this.searchForm.get('dateRangeEnd').setValue(this.getLocalDate());
        params.has('orderBy') ? this.searchForm.get('orderBy').setValue(+params.get('orderBy')) : this.searchForm.get('orderBy').setValue(4);
        params.has('authorType') ? this.searchForm.get('authorType').setValue(+params.get('authorType')) : this.searchForm.get('authorType').setValue(0);
        params.has('employeeId') ? this.searchForm.get('employeeId').setValue(params.get('employeeId')) : this.searchForm.get('employeeId').setValue(null);
        params.has('currentPage') ? this.currentPage = +params.get('currentPage') : this.currentPage = 1;
        params.has('currentStartIndex') ? this.currentStartIndex = +params.get('currentStartIndex') : this.currentStartIndex = 0;
        params.has('currentPageSize') ? this.currentPageSize = +params.get('currentPageSize') : this.currentPageSize = 20;
        params.has('currentSubmissionsCount') ? this.currentSubmissionsCount = +params.get('currentSubmissionsCount') : this.currentSubmissionsCount = null;
      });

    this.subscriptions.add(newListingSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  searchFormForceValidAgain(): void {
    this.areasValid.updateValueAndValidity();
    this.categoryValid.updateValueAndValidity();
    this.statusValid.updateValueAndValidity();
    this.orderByValid.updateValueAndValidity();
    this.typeValid.updateValueAndValidity();
    this.employeeIdValid.updateValueAndValidity();
    this.dateRangeStartValid.updateValueAndValidity();
    this.dateRangeEndValid.updateValueAndValidity();
    this.submissionIdValid.updateValueAndValidity();
    this.authorTypeValid.updateValueAndValidity();
  }

  getUTCDate() {
    return new Date().toUTCString();
  }

  getLocalDate() {
    return new Date();
  }

  updateSearchFilters() {

  }

  onSearchConfirmed() {
    if (this.submissionIdValid.value) {
      this.loadSubmissionViewById(this.submissionIdValid.value);
    } else {
      this.loadSubmissionListByParams();
    }
  }

  loadSubmissionViewById(submissionId: number){
    console.log(submissionId);
    this.router.navigate(['submission'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        submissionId: submissionId.toString(),
        activeTab: '0'
      },
      queryParamsHandling: 'merge'
    });
  }

  loadSubmissionListByParams(){
    this.router.navigate(['listing'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        type: this.typeValid ? this.typeValid.value : null,
        employeeId: this.employeeIdValid ? this.employeeIdValid.value : null,
        areas: this.areasValid ? this.areasValid.value : Array.from(Array(21).keys()),
        category: this.categoryValid ? this.categoryValid.value : Array.from(Array(8).keys()),
        status: this.statusValid ? this.statusValid.value : this.arraysService.statusArrayPrototype(this.sessionService.getUserRole()),
        timestampSearchStart: this.dateRangeStartValid.value ? this.dateRangeStartValid.value.toISOString() : null,
        timestampSearchEnd: this.dateRangeEndValid.value ? this.dateRangeEndValid.value.toISOString() : this.getLocalDate().toISOString(),
        orderBy: this.orderByValid ? this.orderByValid.value : null,
        authorType: this.authorTypeValid ? this.authorTypeValid.value : 0, // KAŻDY
        currentPage: this.currentPage ? this.currentPage : 1,
        currentStartIndex: this.currentStartIndex ? this.currentStartIndex : 0,
        currentPageSize: this.currentPageSize ? this.currentPageSize : 20,
        currentSubmissionsCount: this.currentSubmissionsCount ? this.currentSubmissionsCount : null
      }
    });
  }

  onPageEvent(event: PageEvent){
    this.currentStartIndex = (event.pageIndex * event.pageSize);
    this.currentPageSize = event.pageSize;
    this.loadSubmissionListByParams();
  }
}

