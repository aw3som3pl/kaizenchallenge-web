import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParseService} from '../../../../../shared/parsers/parse.service';
import {TranslateService} from '@ngx-translate/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {ArraysService} from '../../../../../shared/parsers/arrays.service';
import {SessionService} from '../../../../../shared/services/session.service';
import {UserFull} from '../../../../../shared/models/UserFull';
import {UserProfileService} from './service/user-profile.service';
import {UserDataUpdate} from '../../../../../shared/models/events/UserDataUpdate';
import {UserUpdateRequest} from '../../../../../shared/models/request/UserUpdateRequest';
import {Submission} from '../../../../../shared/models/Submission';
import {SubmissionListingRequest} from '../../../../../shared/models/request/SubmissionListingRequest';
import {IsubmissionListingResponse} from '../../../../../shared/models/response/interfaces/isubmission-listing-response';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-usr-profile',
  templateUrl: './usr-profile.component.html',
  styleUrls: ['./usr-profile.component.css']
})
export class UsrProfileComponent implements OnInit {

  @Input() loadedUser: UserFull;
  @Input() isEditorVisible: boolean;
  @Input() userDataValidCheck: Observable<boolean>;

  @Output() userDataUpdateAction = new EventEmitter<UserDataUpdate>();

  totalSubmissionsCount = 0;

  isLoadingSubmissions;

  // Subscriptions Manager
  subscriptions: Subscription;

  userEditForm: FormGroup;

  latestSubmissions: [Submission];

  areasValid: AbstractControl;
  employeeIdValid: AbstractControl;
  nameValid: AbstractControl;
  surnameValid: AbstractControl;
  experienceValid: AbstractControl;
  roleValid: AbstractControl;
  stateValid: AbstractControl;

  constructor(private userProfileService: UserProfileService,
              public parseService: ParseService,
              public sessionService: SessionService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public arraysService: ArraysService,
              public translate: TranslateService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    if (this.isEditorVisible && this.loadedUser){
      this.initializeSubmissionEditForm();
    }
    this.loadRecentSubmissions(this.loadedUser.employeeId);
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }

  initializeSubmissionEditForm() {
    this.userEditForm = this.formBuilder.group({
      areas: [this.loadedUser.areas, [Validators.required]],
      employeeId: [this.loadedUser.employeeId, [Validators.required, Validators.minLength(1)]],
      name: [this.loadedUser.name, [Validators.required, Validators.minLength(2)]],
      surname: [this.loadedUser.surname, [Validators.required, Validators.minLength(2)]],
      experience: [this.loadedUser.experience, [Validators.required]],
      role: [this.loadedUser.role, [Validators.required]],
      state: [this.loadedUser.state, [Validators.required]],
    });

    this.areasValid = this.userEditForm.controls.areas;
    this.employeeIdValid = this.userEditForm.controls.employeeId;
    this.nameValid = this.userEditForm.controls.name;
    this.surnameValid = this.userEditForm.controls.surname;
    this.experienceValid = this.userEditForm.controls.experience;
    this.roleValid = this.userEditForm.controls.role;
    this.stateValid = this.userEditForm.controls.state;

    this.userEditForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editUserFormForceValidAgain());
    this.userEditForm.get('employeeId').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editUserFormForceValidAgain());
    this.userEditForm.get('name').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editUserFormForceValidAgain());
    this.userEditForm.get('surname').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editUserFormForceValidAgain());
    this.userEditForm.get('experience').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editUserFormForceValidAgain());
    this.userEditForm.get('role').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editUserFormForceValidAgain());
    this.userEditForm.get('state').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editUserFormForceValidAgain());
  }

  editUserFormForceValidAgain(): void {

    this.areasValid.updateValueAndValidity();
    this.employeeIdValid.updateValueAndValidity();
    this.nameValid.updateValueAndValidity();
    this.surnameValid.updateValueAndValidity();
    this.experienceValid.updateValueAndValidity();
    this.roleValid.updateValueAndValidity();
    this.stateValid.updateValueAndValidity();
  }

  loadRecentSubmissions(employeeId: string){
    this.isLoadingSubmissions = true;

    this.userProfileService.loadRecentSubmissionsList(employeeId)
      .then( (success: IsubmissionListingResponse) => {
          this.isLoadingSubmissions = false;

          if (success.searchResult.length > 0){
            this.latestSubmissions = success.searchResult;
          } else {
            this.latestSubmissions = null;
          }
          this.totalSubmissionsCount = success.searchResultCount;
        },
        failure => {
          this.isLoadingSubmissions = false;
          this.latestSubmissions = null;
        });
  }

  openUserSubmissions(): void {
    this.router.navigate(['authenticated/home/search/listing'], {
        queryParams: {
          employeeId: this.loadedUser.employeeId,
        },
      }
    ).then(success => {
    });
  }

  openSubmissionViewById(submissionId: number){
    console.log(submissionId);
    this.router.navigate(['authenticated/home/search/submission'], {
      queryParams: {
        submissionId: submissionId.toString(),
        activeTab: '0'
      },
      queryParamsHandling: 'merge'
    });
  }

  emitUserDataUpdateEvent(validityState: boolean){
      this.userDataUpdateAction.emit(new UserDataUpdate(validityState, new UserUpdateRequest(this.userEditForm.value)));
  }
}

