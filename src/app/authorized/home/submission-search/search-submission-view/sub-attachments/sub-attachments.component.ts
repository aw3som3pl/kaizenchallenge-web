import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadRequest} from '../../../../../shared/models/events/UploadRequest';
import {UploadState} from '../../../../../shared/models/events/UploadState';
import {EuploadAction} from '../../../../../shared/enums/Eupload-action.enum';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Attachment} from '../../../../../shared/models/Attachment';
import {SubAttachmentsService} from './service/sub-attachments.service';
import {IattachmentsResponse} from '../../../../../shared/models/response/interfaces/iattachments-response';
import {distinctUntilChanged} from 'rxjs/operators';
import {ParseService} from '../../../../../shared/parsers/parse.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SubmissionAttachmentsUpdate} from '../../../../../shared/models/events/SubmissionAttachmentsUpdate';
import {Observable, Subscription} from 'rxjs';
import {SubmissionContent} from '../../../../../shared/models/SubmissionContent';

@Component({
  selector: 'app-sub-attachments',
  templateUrl: './sub-attachments.component.html',
  styleUrls: ['./sub-attachments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubAttachmentsComponent implements OnInit {

  @Input() loadedSubmission: SubmissionContent;
  @Input() isEditor;

  @Input() updateValidityCheck: Observable<boolean>;

  @Output() submissionAttachmentsUpdateAction = new EventEmitter<SubmissionAttachmentsUpdate>();

  // Subscriptions Handler
  subscriptions: Subscription;

  fileDescriptionForm: FormGroup;

  areAttachmentsLoaded: boolean;
  fileUploadStateArray: EuploadAction[] = [EuploadAction.IDLE, EuploadAction.IDLE, EuploadAction.IDLE];
  isLimitReached;

  fileDescriptionValid: AbstractControl;

  files: File[] = [];
  filesMaxCount = 3;
  isHoveringDropzone: boolean;

  attachmentsTableHeaders = ['Opcje', 'Opis / Nazwa', 'Typ', 'Rozmiar', 'Dodano'];
  expandedAttachment: Attachment | null;
  attachmentsListing = [];

  attachmentsURLs = [];

  constructor(private subAttachmentsService: SubAttachmentsService,
              private formBuilder: FormBuilder,
              public parseService: ParseService) {

    this.fileDescriptionForm = this.formBuilder.group({
      fileDescription: [''],
    });

    this.fileDescriptionValid = this.fileDescriptionForm.controls.fileDescription;
  }

  ngOnInit(): void {
    this.fileDescriptionForm.get('fileDescription').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.fileDescriptionFormForceValidAgain());
    this.loadAttachments();
    console.log(this.updateValidityCheck);
    this.updateValidityCheck.subscribe( status =>  this.emitAttachmentsUpdateAction());
  }

  ngOnDestroy(): void{
    // this.subscriptions.unsubscribe();
  }

  fileDescriptionFormForceValidAgain(): void {
    this.fileDescriptionValid.updateValueAndValidity();
  }

  loadAttachments() {
    this.areAttachmentsLoaded = false;
    this.subAttachmentsService.getSubmissionAttachments(this.loadedSubmission.submissionId)
      .then( (success: IattachmentsResponse) => {
          console.log(success.attachments);
          this.loadAttachmentsInfo(success.attachments);
          this.areAttachmentsLoaded = true;
      },
        failure => this.areAttachmentsLoaded = false
      );
  }

  deleteUploadedAttachment(attachmentIndex: number) {
    this.subAttachmentsService.deleteUploadedAttachmentFromSubmission(this.attachmentsListing[attachmentIndex].attachmentStorageRef)
      .then( deleted => {
        console.log(deleted);
        this.isLimitReached = false;
        this.removeAttachmentFromList(attachmentIndex);
      });
  }

  loadAttachmentsInfo(attachments: [string]) {
    for (const attachment of attachments) {
      this.parseAttachmentObject(attachment);
    }
  }

  parseAttachmentObject(attachmentURL: string) {
    this.subAttachmentsService.downloadAttachmentMetadata(attachmentURL)
      .then( metadata => {
        const attachment = new Attachment(
          metadata.name,
          metadata.size,
          metadata.customMetadata.type,
          metadata.customMetadata.description,
          attachmentURL.split(';')[0],  // download URL
          attachmentURL.split(';')[1],   // storage URL
          metadata.timeCreated);
        this.addAttachmentToList(attachment);
        console.log(this.attachmentsListing);
      },
        failure => {
          console.log(failure);
        });
  }

  prepareFileForUpload(index: number): UploadRequest {
    return new UploadRequest(index, this.files[index], this.fileDescriptionValid.value);
  }

  addAttachmentToList(attachment: Attachment) {
    this.attachmentsListing.push(attachment);
    this.attachmentsURLs.push(`${attachment.attachmentURL};${attachment.attachmentStorageRef}`);
    this.attachmentsListing = [...this.attachmentsListing];
  }

  removeAttachmentFromList(index: number) {
    this.attachmentsListing.splice(index, 1);
    this.attachmentsURLs.splice(index, 1);
    this.attachmentsListing = [...this.attachmentsListing];
  }

  emitAttachmentsUpdateAction(){
    if (this.areAttachmentsUploaded()) {
      this.submissionAttachmentsUpdateAction
        .emit(new SubmissionAttachmentsUpdate(true, this.attachmentsListing.length, this.attachmentsURLs));
    } else {
      this.submissionAttachmentsUpdateAction
        .emit(new SubmissionAttachmentsUpdate(false, this.attachmentsListing.length, this.attachmentsURLs));
    }
  }


  interceptUploadEvent(uploadAction: UploadState){  // TODO: UPLOADING nie działa, dalej można zatwierdzić podczas wysyłania pliku

    console.log(uploadAction);

    const u = EuploadAction;

    switch (uploadAction.uploadState){
      case u.SUCCESSFUL:
        this.attachmentsURLs.splice(uploadAction.fileIndex, 0, uploadAction.fileURL);
        this.fileUploadStateArray[uploadAction.fileIndex] = u.SUCCESSFUL;
        console.log(this.attachmentsURLs);
        break;
      case u.ABORTED:
        this.files.splice(uploadAction.fileIndex, 1);
        this.fileUploadStateArray[uploadAction.fileIndex] = u.ABORTED;
        break;
      case u.ERROR:
        this.fileUploadStateArray[uploadAction.fileIndex] = u.ERROR;
        break;
      case u.PAUSED:
        this.fileUploadStateArray[uploadAction.fileIndex] = u.PAUSED;
        break;
      case u.RESUMED:
        this.fileUploadStateArray[uploadAction.fileIndex] = u.RESUMED;
        break;
      case u.DELETED:
        this.files.splice(uploadAction.fileIndex, 1);
        this.attachmentsURLs.splice(uploadAction.fileIndex, 1);
        this.fileUploadStateArray[uploadAction.fileIndex] = u.IDLE;
        break;
      case u.UPLOADING:
        this.fileUploadStateArray[uploadAction.fileIndex] = u.UPLOADING;
        break;
    }

  }

  isPreviewAvailable(attachment: Attachment): boolean{
    switch (attachment.attachmentType){
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'jpg':
      case 'bmp':
        return true;
      default:
        return false;
    }
  }

  areAttachmentsUploaded(): boolean {
    for (const uploadState of this.fileUploadStateArray){
      if (uploadState === EuploadAction.UPLOADING) {
        return false;
      }
    }
    return true;
  }

  determineAttachmentIndex(attachment: Attachment): number {
    return  this.attachmentsListing.findIndex(a => a.attachmentName === attachment.attachmentName);
  }

  toggleHover(event: boolean) {
    this.isHoveringDropzone = event;
  }

  onDrop(files: FileList) {
    if (this.attachmentsListing.length + files.length <= this.filesMaxCount) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(files.item(i));
      }
    } else {
      this.isLimitReached = true;
    }
  }


}
