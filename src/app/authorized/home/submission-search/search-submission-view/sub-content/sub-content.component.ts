import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubmissionContent} from '../../../../../shared/models/SubmissionContent';
import {ParseService} from '../../../../../shared/parsers/parse.service';
import {TranslateService} from '@ngx-translate/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged} from 'rxjs/operators';
import {SubmissionContentUpdate} from '../../../../../shared/models/events/SubmissionContentUpdate';
import {SubmissionViewService} from '../service/submission-view.service';
import {Observable, Subscription} from 'rxjs';
import {SubmissionAttachmentsUpdate} from '../../../../../shared/models/events/SubmissionAttachmentsUpdate';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {ArraysService} from '../../../../../shared/parsers/arrays.service';
import {SessionService} from '../../../../../shared/services/session.service';

@Component({
  selector: 'app-sub-content',
  templateUrl: './sub-content.component.html',
  styleUrls: ['./sub-content.component.css']
})
export class SubContentComponent implements OnInit {

  @Input() loadedSubmission: SubmissionContent;
  @Input() updateValidityCheck: Observable<boolean>;
  @Input() isEditable;
  @Output() submissionContentUpdateAction = new EventEmitter<SubmissionContentUpdate>();

  // Subscriptions Manager

  subscriptions: Subscription;

  contentEditForm: FormGroup;

  areasValid: AbstractControl;
  categoryValid: AbstractControl;
  topicValid: AbstractControl;
  descriptionValid: AbstractControl;
  additionalValid: AbstractControl;
  additionalValueValid: AbstractControl;
  additionalUnitValid: AbstractControl;

  constructor(public parseService: ParseService,
              public sessionService: SessionService,
              public arraysService: ArraysService,
              private submissionViewService: SubmissionViewService,
              public translate: TranslateService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    if (this.isEditable && this.loadedSubmission){
      this.initializeSubmissionEditForm();

      this.updateValidityCheck.subscribe( state => {
        this.updateSubmissionContentObject();
      });
    }
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }

  initializeSubmissionEditForm() {
    this.contentEditForm = this.formBuilder.group({
      areas: [this.loadedSubmission.areas, [Validators.required]],
      category: [this.loadedSubmission.category, [Validators.required]],
      topic: [this.loadedSubmission.topic, [Validators.required,  Validators.minLength(10), Validators.maxLength(120)]],
      description: [this.loadedSubmission.description, [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
      additional: [this.loadedSubmission.additional, [Validators.minLength(20), Validators.maxLength(150)]],
      additionalValue: [this.loadedSubmission.additionalValue, [Validators.maxLength(9)]],
      additionalUnit: [this.loadedSubmission.additionalUnit, null],
    });

    this.areasValid = this.contentEditForm.controls.areas;
    this.categoryValid = this.contentEditForm.controls.category;
    this.topicValid = this.contentEditForm.controls.topic;
    this.descriptionValid = this.contentEditForm.controls.description;
    this.additionalValid = this.contentEditForm.controls.additional;
    this.additionalValueValid = this.contentEditForm.controls.additionalValue;
    this.additionalUnitValid = this.contentEditForm.controls.additionalUnit;

    this.contentEditForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editContentsFormForceValidAgain());
    this.contentEditForm.get('category').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editContentsFormForceValidAgain());
    this.contentEditForm.get('topic').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editContentsFormForceValidAgain());
    this.contentEditForm.get('description').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editContentsFormForceValidAgain());
    this.contentEditForm.get('additional').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editContentsFormForceValidAgain());
    this.contentEditForm.get('additionalValue').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editContentsFormForceValidAgain());
    this.contentEditForm.get('additionalUnit').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.editContentsFormForceValidAgain());
  }

  editContentsFormForceValidAgain(): void {

    this.emitSubmissionContentUpdateAction(false);

    this.areasValid.updateValueAndValidity();
    this.categoryValid.updateValueAndValidity();
    this.topicValid.updateValueAndValidity();
    this.descriptionValid.updateValueAndValidity();
    this.additionalValid.updateValueAndValidity();
    this.additionalValueValid.updateValueAndValidity();
    this.additionalUnitValid.updateValueAndValidity();
  }

  updateSubmissionContentObject(){
    if (this.contentEditForm.valid && this.checkAdditionalRequired()) {
      this.loadedSubmission.areas = this.areasValid.value;
      this.loadedSubmission.category = this.categoryValid.value;
      this.loadedSubmission.topic = this.topicValid.value;
      this.loadedSubmission.description = this.descriptionValid.value;
      this.loadedSubmission.additional = this.additionalValid.value;
      this.loadedSubmission.additionalValue = this.additionalValueValid.value;
      this.loadedSubmission.additionalUnit = this.additionalUnitValid.value;
    }
    this.emitSubmissionContentUpdateAction(this.contentEditForm.valid);
  }

  emitSubmissionContentUpdateAction(valid: boolean){
    if (valid) {
      this.submissionContentUpdateAction
        .emit(new SubmissionContentUpdate(true));
    } else {
      this.submissionContentUpdateAction
        .emit(new SubmissionContentUpdate(false));
    }
  }

  checkAdditionalRequired(): boolean {
    if (this.additionalValueValid.value || this.additionalUnitValid.value || this.additionalValid.value){
      this.toggleAdditionalRequired(true);
      this.editContentsFormForceValidAgain();
      return true;
    } else {
      this.toggleAdditionalRequired(false);
      this.editContentsFormForceValidAgain();
      return false;
    }
  }

  toggleAdditionalRequired(isRequired: boolean) {
    const additionalValueControl = this.contentEditForm.get('additionalValue');
    const additionalUnitControl = this.contentEditForm.get('additionalUnit');
    const additionalControl = this.contentEditForm.get('additional');

    if (isRequired){
      additionalControl.setValidators([Validators.required, Validators.minLength(20), Validators.maxLength(150)]);
      additionalValueControl.setValidators([Validators.required, Validators.maxLength(9)]);
      additionalUnitControl.setValidators(Validators.required);
    } else {
      additionalControl.setValidators(null);
      additionalValueControl.setValidators(null);
      additionalUnitControl.setValidators(null);
    }
  }


  parseTypedResource(path: string): string {
    return `Home.Search.SubmissionView.${this.loadedSubmission.type}.${path}`;
  }

}
