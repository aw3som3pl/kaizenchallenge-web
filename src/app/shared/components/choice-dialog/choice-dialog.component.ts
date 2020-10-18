import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EsubmissionContentEditValidityEnum} from '../../enums/Esubmission-content-edit-validity.enum';
import {EsubmissionAttachmentsEditValidityEnum} from '../../enums/Esubmission-attachments-edit-validity.enum';
import {ParseService} from '../../parsers/parse.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-choice-dialog',
  templateUrl: './choice-dialog.component.html',
  styleUrls: ['./choice-dialog.component.css']
})
export class ChoiceDialogComponent implements OnInit {

  submissionContentUpdateState: EsubmissionContentEditValidityEnum;
  submissionAttachmentsUpdateState: EsubmissionAttachmentsEditValidityEnum;

  constructor(private dialogRef: MatDialogRef<ChoiceDialogComponent>,
              public parseService: ParseService,
              public translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) data) {

    this.submissionContentUpdateState = data.contentUpdateState;
    this.submissionAttachmentsUpdateState = data.attachmentsUpdateState;

    console.log('Attachments state' + this.submissionAttachmentsUpdateState);
    console.log('Content state' + this.submissionContentUpdateState);
  }

  ngOnInit() {

  }

  proceedWithUpload() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }

  isDataReadyForUpload(): boolean {
    return this.submissionContentUpdateState !== EsubmissionContentEditValidityEnum.CONTENT_INVALID
      && this.submissionAttachmentsUpdateState !== EsubmissionAttachmentsEditValidityEnum.ATTACHMENTS_UPLOADING;
  }

}
