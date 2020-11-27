import {Component, OnInit, ViewChild} from '@angular/core';
import {SubmissionContent} from '../../../../shared/models/SubmissionContent';
import {IsubmissionContent} from '../../../../shared/models/interfaces/isubmission-content';
import {SubmissionViewService} from './service/submission-view.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParseService} from '../../../../shared/parsers/parse.service';
import {MatTabGroup} from '@angular/material/tabs';
import {SubmissionSearchService} from '../service/submission-search.service';
import {SubmissionContentUpdate} from '../../../../shared/models/events/SubmissionContentUpdate';
import {IsubmissionUpdateResponse} from '../../../../shared/models/response/interfaces/isubmission-update-response';
import {EeventActionEnum} from '../../../../shared/enums/Eevent-action.enum';
import {LikeActionRequest} from '../../../../shared/models/request/LikeActionRequest';
import {IlikeActionResponse} from '../../../../shared/models/response/interfaces/ilike-action-response';
import {Subject} from 'rxjs';
import {SubmissionAttachmentsUpdate} from '../../../../shared/models/events/SubmissionAttachmentsUpdate';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ChoiceDialogComponent} from '../../../../shared/components/choice-dialog/choice-dialog.component';
import {EsubmissionContentEditValidityEnum} from '../../../../shared/enums/Esubmission-content-edit-validity.enum';
import {EsubmissionAttachmentsEditValidityEnum} from '../../../../shared/enums/Esubmission-attachments-edit-validity.enum';

@Component({
  selector: 'app-submission',
  templateUrl: './search-submission-view.component.html',
  styleUrls: ['./search-submission-view.component.css']
})
export class SearchSubmissionViewComponent implements OnInit {

  @ViewChild('submissionTabGroup') submissionTabGroup: MatTabGroup;

  isSendingLike = false;
  isSendingUpdate = false;

  // Shared events
  editableContentValidityCheck: Subject<boolean> = new Subject<boolean>();
  editableAttachmentsValidityCheck: Subject<boolean> = new Subject<boolean>();

  // Subscriptions
  private urlSub: any;

  // Params
  submissionId: number;
  activeTab: SubmissionViewTab;

  activeTabs = SubmissionViewTab;
  currentActiveTab = this.activeTabs.CONTENTS;

  isLoadingContents = false;

  loadedSubmission: SubmissionContent;
  isLiked: boolean;

  // EDIT
  isEditable = false;
  attachmentsURLs: string[];

  submissionContentEditFormValidity = EsubmissionContentEditValidityEnum.NOT_CHANGED;
  submissionAttachmentsEditFormValidity = EsubmissionAttachmentsEditValidityEnum.NOT_CHANGED;

  constructor(private submissionViewService: SubmissionViewService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public parseService: ParseService,
              public submissionSearchService: SubmissionSearchService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.urlSub = this.activatedRoute.queryParams.subscribe(params => {
      console.log(JSON.stringify(params));
      if (this.submissionId !== +params.submissionId) {
        this.submissionId = +params.submissionId;
        this.reloadContentsData();
      }
      this.currentActiveTab = +params.activeTab;
    });
  }

  ngOnDestroy() {
    this.submissionSearchService.enableSearchFilter();
    this.urlSub.unsubscribe();
  }

  showEditConfirmationDialog(updatedAttachmentsList: string[] | null) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = {
      contentUpdateState: this.submissionContentEditFormValidity,
      attachmentsUpdateState: this.submissionAttachmentsEditFormValidity
    };

    const dialogRef = this.dialog.open(ChoiceDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      outcome => {
        if (outcome) {
        //  this.updateSubmissionData(updatedAttachmentsList);
        }
      }
    );
  }

  reloadContentsData() {
    this.isLoadingContents = true;
    this.submissionViewService.getSubmissionContents(this.submissionId).then((success: IsubmissionContent) => {
      this.submissionSearchService.disableSearchFilter();
      this.isLoadingContents = false;
      this.loadedSubmission = success;
      this.isLiked = this.loadedSubmission.isLiked;
      this.isEditable = this.submissionViewService.determineEditableState(this.loadedSubmission.status, this.loadedSubmission.editor);
      console.log(this.loadedSubmission);
    }, error => {
      this.isLoadingContents = false;
    });
  }

  updateSubmissionData() {
    this.isSendingUpdate = true;
    this.submissionViewService.sendSubmissionUpdateData(
      this.submissionViewService.prepareSubmissionForUpdate(this.loadedSubmission, this.attachmentsURLs))
      .then( (success: IsubmissionUpdateResponse) => {
        console.log(success.timestampUpdated);
        this.reloadContentsData();
        this.isSendingUpdate = false;
      },
        failure => {
          console.log(failure);
          this.isSendingUpdate = false;
        });
  }

  performLikeAction() {
    this.isSendingLike = true;
    this.submissionViewService.sendSubmissionLike( new LikeActionRequest(!this.isLiked, this.loadedSubmission.submissionId))
      .then( (success: IlikeActionResponse) => {
        console.log(success);
        this.isLiked = !this.isLiked;
        this.loadedSubmission.likeCount = success.newLikeCount;
        this.isSendingLike = false;
      },
        failure => {
          this.isSendingLike = false;
        });
  }


  updateTabParam(value: string){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        submissionId: this.submissionId,
        activeTab: value
      },
      queryParamsHandling: 'merge'
    });
  }

  forceTabChange(newTabIndex: number){
    this.currentActiveTab = newTabIndex;
  }

  onTabChange($event: any){
    this.currentActiveTab = $event.index;
    this.updateTabParam(this.currentActiveTab.toString());
  }

  onBacktoSearch() {
    this.submissionSearchService.enableSearchFilter();
    this.router.navigate(['listing'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        submissionId: null,
        activeTab: null
      },
      queryParamsHandling: 'merge'}
    );
  }

  emitEditableContentCheckEvent() {
    this.editableContentValidityCheck.next(true);
  }

  emitEditableAttachmentsCheckEvent() {
    this.editableAttachmentsValidityCheck.next(true);
  }

  interceptContentUpdateAction(contentUpdate: SubmissionContentUpdate){
    const s = EsubmissionContentEditValidityEnum;
    console.log('CONTENT VALIDITY ' + contentUpdate.contentFormValid);

    if (contentUpdate.contentFormValid){
      this.submissionContentEditFormValidity = s.CONTENT_VALID;
      this.forceTabChange(3); // TAB ATTACHMENTS
    } else {
      this.submissionContentEditFormValidity = s.CONTENT_INVALID;
    }
  }

  interceptAttachmentsUpdateAction(attachmentsUpdate: SubmissionAttachmentsUpdate){
    const s = EsubmissionAttachmentsEditValidityEnum;
    console.log('ATTACHMENTS VALIDITY ' + attachmentsUpdate.areAttachmentsUploaded);
    console.log('ATTACHMENTS ARRAY ' + attachmentsUpdate.attachmentURLs);

    if (attachmentsUpdate.areAttachmentsUploaded){
      this.loadedSubmission.attachmentsCount = attachmentsUpdate.attachmentsCount;
      this.attachmentsURLs = attachmentsUpdate.attachmentURLs;
      this.submissionAttachmentsEditFormValidity = s.ATTACHMENTS_UPLOADED;
      this.forceTabChange(0); // TAB CONTENT
    } else {
      this.submissionAttachmentsEditFormValidity = s.ATTACHMENTS_UPLOADING;
    }
  }

  interceptNewReviewAction(actionCode: EeventActionEnum){
    switch (actionCode){
      case EeventActionEnum.SEND_SUCCESS:
        this.reloadContentsData();
        break;
      default:
        console.log('coś jebło');
        break;
    }
  }

  determineReviewerName(): string {
    if (this.loadedSubmission.editor) {
      return this.loadedSubmission.editorName;
    }
    else {
      return this.loadedSubmission.currentReviewerName;
    }
  }

  determineReviewerId(): number | string {
    if (this.loadedSubmission.editor) {
      return this.loadedSubmission.editorEmployeeId;
    }
    else {
      return this.loadedSubmission.currentReviewerEmployeeId;
    }
  }

  determineReviewerRole(): number {
    if (this.loadedSubmission.editor) {
      return this.loadedSubmission.editorRole;
    }
    else {
      return this.loadedSubmission.currentReviewerRole;
    }
  }

  isUpdatedDataReadyForUpload(): boolean {
    return this.isContentsDataValid() && this.isAttachmentsDataValid();
  }

  validateLocalData() {
    const s = SubmissionViewTab;

    switch (this.currentActiveTab) {
      case s.CONTENTS:
        this.emitEditableContentCheckEvent();
        break;
      case s.ATTACHMENTS:
        this.emitEditableAttachmentsCheckEvent();
        break;
    }
  }

  isLocalDataValid(selectedTab: number) {
    const s = SubmissionViewTab;

    switch (selectedTab) {
      case s.CONTENTS:
        return this.isContentsDataValid();
      case s.ATTACHMENTS:
        return this.isAttachmentsDataValid();
    }
  }

  isEditConfirmationRequired(): boolean {
    return this.isEditable && (this.currentActiveTab === this.activeTabs.CONTENTS || this.currentActiveTab === this.activeTabs.ATTACHMENTS);
  }

  isContentsDataValid(): boolean {
    const vc = EsubmissionContentEditValidityEnum;
    return this.submissionContentEditFormValidity === vc.CONTENT_VALID;
  }

  isAttachmentsDataValid(): boolean {
    const va = EsubmissionAttachmentsEditValidityEnum;
    return this.submissionAttachmentsEditFormValidity === va.ATTACHMENTS_UPLOADED;
  }

  parseTypedResource(path: string): string {
    return `Home.Search.SubmissionView.${this.loadedSubmission.type}.${path}`;
  }

}

enum SubmissionViewTab {
  CONTENTS,
  REVIEWS,
  COMMENTS,
  ATTACHMENTS,
  LIKES,
  HISTORY
}
