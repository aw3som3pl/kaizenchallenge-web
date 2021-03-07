import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {distinctUntilChanged} from 'rxjs/operators';
import {ParseService} from '../../../shared/parsers/parse.service';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {SessionService} from '../../../shared/services/session.service';
import {CreateSubmissionService} from './service/create-submission.service';
import {ReviewerRequest} from '../../../shared/models/request/ReviewerRequest';
import {IreviewerResponse} from '../../../shared/models/response/interfaces/ireviewer-response';
import {UploadRequest} from '../../../shared/models/events/UploadRequest';
import {UploadState} from '../../../shared/models/events/UploadState';
import {EuploadAction} from '../../../shared/enums/Eupload-action.enum';
import {InewSubmissionResponse} from '../../../shared/models/response/interfaces/inew-submission-response';
import {EsubmissionTypeEnum} from '../../../shared/enums/Esubmission-type.enum';
import {ArraysService} from '../../../shared/parsers/arrays.service';

@Component({
  selector: 'app-create',
  templateUrl: './submission-create.component.html',
  styleUrls: ['./submission-create.component.css']
})
export class SubmissionCreateComponent implements OnInit {
  @ViewChild('stepper') stepper;

  isSendingSubmission = false;

  reviewersList = [];
  isLoadingReviewers = false;

  files: File[] = [];
  filesMaxCount = 3;
  isHoveringDropzone: boolean;

  uploadedFilesUrls: string[] = [];

  submissionResponseId: number;
  submissionCreationDate;

  submissionStep1Form: FormGroup;
  submissionStep2Form: FormGroup;

  isAdditionalEnabled = true;
  isAdditionalValueEnabled = true;

  public submissionType = EsubmissionTypeEnum;
  public currentSubmissionType = EsubmissionTypeEnum.IDEA;

  areasValid: AbstractControl;
  categoryValid: AbstractControl;
  topicValid: AbstractControl;
  descriptionIdValid: AbstractControl;
  additionalValid: AbstractControl;
  additionalValueValid: AbstractControl;
  additionalUnitValid: AbstractControl;

  reviewerValid: AbstractControl;
  fileDescription: AbstractControl;

  // TODO: Załatać luki - oczekiwanie na wysłanie załączników

  constructor(private formBuilder: FormBuilder,
              public parseService: ParseService,
              public createSubmissionService: CreateSubmissionService,
              public sessionService: SessionService,
              public arraysService: ArraysService,
              private translate: TranslateService) {


    this.submissionStep1Form = this.formBuilder.group({
      areas: ['', [Validators.required]],
      category: ['', [Validators.required]],
      topic: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(120)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
      additional: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]],
      additionalValue: ['', [Validators.required, Validators.maxLength(9)]],
      additionalUnit: ['', Validators.required],
    });

    this.submissionStep2Form = this.formBuilder.group({
      reviewer: ['', [Validators.required]],
      fileDescription: [''],
    });

    this.areasValid = this.submissionStep1Form.controls.areas;
    this.categoryValid = this.submissionStep1Form.controls.category;
    this.topicValid = this.submissionStep1Form.controls.topic;
    this.descriptionIdValid = this.submissionStep1Form.controls.description;
    this.additionalValid = this.submissionStep1Form.controls.additional;
    this.additionalValueValid = this.submissionStep1Form.controls.additionalValue;
    this.additionalUnitValid = this.submissionStep1Form.controls.additionalUnit;

    this.reviewerValid = this.submissionStep2Form.controls.reviewer;
    this.fileDescription = this.submissionStep2Form.controls.fileDescription;

  }

  ngOnInit(): void {
    this.submissionStep1Form.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step1ForceValidAgain());
    this.submissionStep1Form.get('category').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step1ForceValidAgain());
    this.submissionStep1Form.get('topic').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step1ForceValidAgain());
    this.submissionStep1Form.get('description').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step1ForceValidAgain());
    this.submissionStep1Form.get('additional').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step1ForceValidAgain());
    this.submissionStep1Form.get('additionalValue').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step1ForceValidAgain());
    this.submissionStep1Form.get('additionalUnit').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step1ForceValidAgain());

    this.submissionStep2Form.get('reviewer').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step2ForceValidAgain());
    this.submissionStep2Form.get('fileDescription').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.step2ForceValidAgain());

    this.showIdeaDescriptionTemplate();

  }

  showIdeaDescriptionTemplate() {
    if (this.currentSubmissionType === this.submissionType.IDEA) {
      this.descriptionIdValid.setValue('Sytuacja przed:\n\n\n\n\n\n Sytuacja po:');
    }
  }

  step1ForceValidAgain(): void {
    this.areasValid.updateValueAndValidity();
    this.categoryValid.updateValueAndValidity();
    this.topicValid.updateValueAndValidity();
    this.descriptionIdValid.updateValueAndValidity();
    this.additionalValid.updateValueAndValidity();
    this.additionalValueValid.updateValueAndValidity();
    this.additionalUnitValid.updateValueAndValidity();
  }

  step2ForceValidAgain(): void {
    this.reviewerValid.updateValueAndValidity();
    this.fileDescription.updateValueAndValidity();
  }

  onAdditionalEnabledChange(val: MatButtonToggleChange){
    const additionalControl = this.submissionStep1Form.get('additional');

    if (val.value === true){
      additionalControl.enable({onlySelf: true});
      additionalControl.setValidators([Validators.required, Validators.maxLength(150)]);
    } else {
      additionalControl.disable({onlySelf: true});
      additionalControl.setValidators(null);
    }

    this.additionalValid.updateValueAndValidity();

    this.isAdditionalEnabled = val.value;
  }

  onAdditionalValueEnabledChange(val: MatButtonToggleChange){
    const additionalValueControl = this.submissionStep1Form.get('additionalValue');
    const additionalUnitControl = this.submissionStep1Form.get('additionalUnit');
    if (val.value === true){
      additionalValueControl.enable({onlySelf: true});
      additionalUnitControl.enable({onlySelf: true});
      additionalValueControl.setValidators([Validators.required, Validators.required , Validators.maxLength(12)]);
      additionalUnitControl.setValidators(Validators.required);
    } else {
      additionalValueControl.disable({onlySelf: true});
      additionalUnitControl.disable({onlySelf: true});
      additionalValueControl.setValidators(null);
      additionalUnitControl.setValidators(null);
    }

    this.additionalValueValid.updateValueAndValidity();
    this.additionalUnitValid.updateValueAndValidity();

    this.isAdditionalValueEnabled = val.value;
  }

  onLoadReviewersList(designatedAreas: number[], designatedRoles: number[]) {
    this.isLoadingReviewers = true;
    this.createSubmissionService.getReviewersList( new ReviewerRequest(designatedAreas, designatedRoles))
      .then((result: IreviewerResponse) => {
          this.reviewersList = result.reviewers;
          this.isLoadingReviewers = false;
        },
        failure => {
          this.reviewersList = null;
          this.isLoadingReviewers = false;
        });
  }

  onSendSubmissionData() {
    if (this.submissionStep2Form.valid) {
      this.isSendingSubmission = true;
      this.createSubmissionService.sendNewSubmissionData(this.createSubmissionService.parseSubmissionForms(this.currentSubmissionType, this.submissionStep1Form, this.submissionStep2Form, this.uploadedFilesUrls))
        .then((success: InewSubmissionResponse) => {
          this.submissionResponseId = success.submissionId;
          this.submissionCreationDate = success.timestampUpdated;
          this.isSendingSubmission = false;
          this.stepper.next();
        });
    }
  }

  onStepNavigation(step: number){
    const reviewerSelect = this.submissionStep1Form.get('reviewer');

    switch (step) {
      case 1:
        break;
      case 2:
        if (this.submissionStep1Form.valid) {
          if (this.currentSubmissionType === EsubmissionTypeEnum.IDEA) {
            this.onLoadReviewersList(this.submissionStep1Form.get('areas').value, this.createSubmissionService.getNextReviewerRole(this.sessionService.getUserRole()));  // zawsze do następnego po sobie!
          }
          if (this.currentSubmissionType === EsubmissionTypeEnum.PROBLEM) {
            this.onLoadReviewersList(this.submissionStep1Form.get('areas').value, [1, 2, 3, 4]);  // do wszystkich ról
          }
        }
        break;
    }
  }

  toggleHover(event: boolean) {
    this.isHoveringDropzone = event;
  }

  onDrop(files: FileList) {
    if (this.files.length + files.length <= this.filesMaxCount) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(files.item(i));
      }
    } else {

    }
  }

  prepareFileForUpload(index: number): UploadRequest {
    return new UploadRequest(index, this.files[index], this.fileDescription.value);
  }

  interceptUploadEvent(uploadAction: UploadState){
    switch (uploadAction.uploadState){

      case EuploadAction.SUCCESSFUL:
        this.uploadedFilesUrls.splice(uploadAction.fileIndex, 0, uploadAction.fileURL);
        console.log(this.uploadedFilesUrls);
        break;
      case EuploadAction.ABORTED:
        this.files.splice(uploadAction.fileIndex, 1);
        break;

      case EuploadAction.ERROR:

      case EuploadAction.PAUSED:

      case EuploadAction.RESUMED:

      case EuploadAction.DELETED:
        this.files.splice(uploadAction.fileIndex, 1);
        this.uploadedFilesUrls.splice(uploadAction.fileIndex, 1);
        console.log(this.uploadedFilesUrls);
        console.log(this.files);
        break;

    }
  }

  onStepperReset() {
    this.stepper.reset();
    this.uploadedFilesUrls = [];
    this.files = [];

    this.showIdeaDescriptionTemplate();
  }

  parseTypedResource(path: string): string {
    return `Home.SubmissionForm.${this.currentSubmissionType.toString()}.${path}`;
  }

  toggleSubmissionType(type: EsubmissionTypeEnum): void {
    if (this.currentSubmissionType !== type){
      this.currentSubmissionType = type;
      this.onStepperReset();
    }
  }

  get selectedReviewerName() {
    if (this.submissionStep2Form.get('reviewer').value){
      return this.submissionStep2Form.get('reviewer').value.reviewerName;
    } else {
      return null;
    }
  }

  get selectedReviewerId() {
    if (this.submissionStep2Form.get('reviewer').value){
      return this.submissionStep2Form.get('reviewer').value.reviewerId;
    } else {
      return null;
    }
  }

}
