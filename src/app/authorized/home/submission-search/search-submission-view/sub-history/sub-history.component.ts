import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubmissionContent} from '../../../../../shared/models/SubmissionContent';
import {UploadState} from '../../../../../shared/models/events/UploadState';
import {IsubmissionReviewsResponse} from '../../../../../shared/models/response/interfaces/isubmission-reviews-response';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParseService} from '../../../../../shared/parsers/parse.service';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../../../../shared/services/session.service';
import {SubReviewService} from '../sub-reviews/service/sub-review.service';
import {SubmissionHistory} from '../../../../../shared/models/SubmissionHistory';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sub-history',
  templateUrl: './sub-history.component.html',
  styleUrls: ['./sub-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubHistoryComponent implements OnInit {

  @Input() loadedSubmission: SubmissionContent;
  @Output() historyAction = new EventEmitter<UploadState>();

  isReloading = true;

  historyTableHeaders = ['Status', 'Użytkownik', 'ID', 'Rola', 'Data'];
  historyObjectFields = ['historyStatus', 'entityName', 'userId', 'userRole', 'timestampCreated'];
  expandedHistory: SubmissionHistory | null;

  constructor(private formBuilder: FormBuilder,
              public parseService: ParseService,
              public translate: TranslateService,
              public sessionService: SessionService,
              public subReviewService: SubReviewService) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
