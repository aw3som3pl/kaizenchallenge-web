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
              private submissionViewService: SubmissionViewService,
              public translate: TranslateService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    if (this.isEditable && this.loadedSubmission){
      this.initializeSubmissionEditForm();

      this.updateValidityCheck.subscribe( state => {
        console.log(state);
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
      additional: [this.loadedSubmission.additional, [Validators.maxLength(150)]],
      additionalValue: [this.loadedSubmission.additionalValue, [Validators.maxLength(12)]],
      additionalUnit: [this.loadedSubmission.additionalUnit],
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
    this.areasValid.updateValueAndValidity();
    this.categoryValid.updateValueAndValidity();
    this.topicValid.updateValueAndValidity();
    this.descriptionValid.updateValueAndValidity();
    this.additionalValid.updateValueAndValidity();
    this.additionalValueValid.updateValueAndValidity();
    this.additionalUnitValid.updateValueAndValidity();
  }

  updateSubmissionContentObject(){
    if (this.contentEditForm.valid) {
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
      console.log('CONTENT EMIT: VALID');
    } else {
      this.submissionContentUpdateAction
        .emit(new SubmissionContentUpdate(false));
      console.log('CONTENT EMIT: INVALID');
    }
  }

  parseTypedResource(path: string): string {
    return `Home.Search.SubmissionView.${this.loadedSubmission.type}.${path}`;
  }

  areaArrayPrototype(n: number): any[] {
    return Array(n);
  }

  categoryArrayPrototype(n: number): any[] {
    return Array(n);
  }

  additionalUnitArrayPrototype(n: number): any[] {
    return Array(n);
  }


}
