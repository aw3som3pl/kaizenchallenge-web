import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {distinctUntilChanged} from 'rxjs/operators';
import {ParseService} from '../../shared/parsers/parse.service';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {SessionService} from '../../shared/services/session.service';
import {CreateSubmissionService} from './submission-create/service/create-submission.service';
import {ReviewerRequest} from '../../shared/models/request/ReviewerRequest';
import {IreviewerResponse} from '../../shared/models/response/interfaces/ireviewer-response';
import {UploadRequest} from '../../shared/models/events/UploadRequest';
import {UploadState} from '../../shared/models/events/UploadState';
import {EuploadAction} from '../../shared/enums/Eupload-action.enum';
import {Reviewer} from '../../shared/models/Reviewer';
import {InewSubmissionResponse} from '../../shared/models/response/interfaces/inew-submission-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(public parseService: ParseService,
              public homeService: CreateSubmissionService,
              public sessionService: SessionService) {}

  ngOnInit(): void {

  }

}
