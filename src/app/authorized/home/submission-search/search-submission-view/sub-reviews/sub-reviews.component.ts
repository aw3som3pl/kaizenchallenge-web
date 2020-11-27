import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParseService} from '../../../../../shared/parsers/parse.service';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../../../../shared/services/session.service';
import {distinctUntilChanged} from 'rxjs/operators';
import {IsubmissionReviewsResponse} from '../../../../../shared/models/response/interfaces/isubmission-reviews-response';
import {SubReviewService} from './service/sub-review.service';
import {IreviewerResponse} from '../../../../../shared/models/response/interfaces/ireviewer-response';
import {Ireviewer} from '../../../../../shared/models/interfaces/ireviewer';
import {InewReviewResponse} from '../../../../../shared/models/response/interfaces/inew-review-response';
import {SubmissionContent} from '../../../../../shared/models/SubmissionContent';
import {Review} from '../../../../../shared/models/Review';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EreviewersSourceEnum} from '../../../../../shared/enums/Ereviewers-source.enum';
import {EeventActionEnum} from '../../../../../shared/enums/Eevent-action.enum';

@Component({
  selector: 'app-sub-reviews',
  templateUrl: './sub-reviews.component.html',
  styleUrls: ['./sub-reviews.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubReviewsComponent implements OnInit {

  @Input() loadedSubmission: SubmissionContent;
  @Output() reviewAction = new EventEmitter<EeventActionEnum>();

  isSendingReview = false;

  isReviewCreatorFolded = true;

  isLoadingReviews = false;
  isLoadingReviewers = false;

  reviewsTableHeaders = ['Nowy status', 'Recenzent', 'Komentarz Recenzenta', 'Data recenzji'];
  reviewObjectFields = ['reviewStatus', 'reviewerName', 'reviewerMessage', 'timestampUpdated'];
  expandedReview: Review | null;

  isAssignedReviewer = false;

  loadedReviews: [Review];
  loadedReviewers: [Ireviewer];

  nextStatusArray: number[];

  reviewForm: FormGroup;

  reviewMessageValid: AbstractControl;
  reviewNextStatusValid: AbstractControl;
  reviewNextReviewerValid: AbstractControl;

  currentReviewStatus: number;
  currentNextReviewerId: number;


  constructor(private formBuilder: FormBuilder,
              public parseService: ParseService,
              public translate: TranslateService,
              public sessionService: SessionService,
              public subReviewService: SubReviewService) {

    this.reviewForm = this.formBuilder.group({
      reviewMessage: [null, { disabled: false }, [Validators.required, Validators.minLength(20), Validators.maxLength(400)]],
      reviewStatus: [null, { disabled: false }, Validators.required],
      nextReviewer: [null, { disabled: true }],
    });

    this.reviewMessageValid = this.reviewForm.controls.reviewMessage;
    this.reviewNextStatusValid = this.reviewForm.controls.reviewStatus;
    this.reviewNextReviewerValid = this.reviewForm.controls.nextReviewer;

  }

  ngOnInit(): void {

    this.loadSubmissionReviews();
    this.nextStatusArray = this.loadNextReviewStatusArray();

    this.reviewForm.get('reviewMessage').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.reviewFormForceValidAgain());
    this.reviewForm.get('reviewStatus').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.reviewFormForceValidAgain());
    this.reviewForm.get('nextReviewer').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.reviewFormForceValidAgain());

    this.isAssignedReviewer = this.subReviewService.checkIsReviewer(this.loadedSubmission.currentReviewerId, this.loadedSubmission.areas);
  }

  ngOnDestroy(): void {

  }

  reviewFormForceValidAgain(): void {

    this.reviewMessageValid.updateValueAndValidity();
    this.reviewNextStatusValid.updateValueAndValidity();
    this.reviewNextReviewerValid.updateValueAndValidity();

    if ( this.currentReviewStatus !== this.reviewNextStatusValid.value){
      this.currentReviewStatus = this.reviewNextStatusValid.value;
      this.populateReviewersList(this.currentReviewStatus, this.loadedSubmission.type);
    }
  }

  loadSubmissionReviews() {
    this.isLoadingReviews = true;
    this.subReviewService.getSubmissionReviews(this.loadedSubmission.submissionId)
      .then( (reviewsData: IsubmissionReviewsResponse) => {
        this.loadedReviews = reviewsData.reviews;
        console.log(this.loadedReviews);
        this.isLoadingReviews = false;
      });
  }

  sendReview(){
    if (this.reviewForm.valid){
      this.isSendingReview = true;
      this.subReviewService.sendReviewData(this.reviewForm, this.loadedSubmission.currentReviewerId, this.loadedSubmission.submissionId)
        .then( (success: InewReviewResponse) => {
          console.log(success);
          this.isSendingReview = false;
          this.emitReviewAction(EeventActionEnum.SEND_SUCCESS);
        },
          failure => {
            this.isSendingReview = false;
            this.emitReviewAction(EeventActionEnum.SEND_FAILURE);
          });
    }
  }

  populateReviewersList(reviewStatus: number, submissionType: number) {
    const rs = EreviewersSourceEnum;
    const reviewersSource: EreviewersSourceEnum = this.subReviewService.determineReviewerSource(reviewStatus, submissionType);

    switch (reviewersSource){
      case rs.FROM_DATABASE:
        this.loadFromDatabase();
        break;
      case rs.FROM_HISTORY:
        this.loadFromHistory();
        break;
      case rs.NO_REVIEWER:
        this.loadedReviewers = null;
        break;
    }
  }

  loadNextReviewStatusArray(): number[] {
    return this.subReviewService.determinePossibleReviewOptions(this.loadedSubmission.type, this.loadedSubmission.status);
  }

  loadFromDatabase() {
    this.isLoadingReviewers = true;

    this.subReviewService.getNextReviewersListFromDatabase(
      this.subReviewService.prepareReviewerRequestObj(this.loadedSubmission.areas, this.loadedSubmission.type, this.reviewNextStatusValid.value)
    )
    .then( ( success: IreviewerResponse) => {
      this.loadedReviewers = success.reviewers;
      this.isLoadingReviewers = false;
    },
      error => {
      this.isLoadingReviewers = false;
      });
  }

  loadFromHistory() {
    this.loadedReviewers = this.subReviewService.getNextReviewersListFromHistory(this.loadedSubmission);
  }

  get selectedReviewerName() {
    if (this.reviewNextReviewerValid.value){
      return this.reviewNextReviewerValid.value.reviewerName;
    } else {
      return null;
    }
  }

  toggleReviewCreator(){
    this.isReviewCreatorFolded = !this.isReviewCreatorFolded;
  }

  isNextReviewerRequired(): boolean {
    return this.subReviewService.checkIsNewReviewerRequired(this.reviewNextStatusValid.value);
  }

  emitReviewAction(result: EeventActionEnum){
      this.reviewAction.emit(result);
  }


}
