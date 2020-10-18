import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {IattachmentsResponse} from '../../../../../../shared/models/response/interfaces/iattachments-response';
import {AngularFireStorage} from '@angular/fire/storage';
import {Attachment} from '../../../../../../shared/models/Attachment';
import {MetadataArray} from '@angular/compiler-cli';
import * as firebase from 'firebase';
import {take} from 'rxjs/operators';
import {UploadState} from '../../../../../../shared/models/events/UploadState';
import {EuploadAction} from '../../../../../../shared/enums/Eupload-action.enum';

@Injectable({
  providedIn: 'root'
})
export class SubAttachmentsService {

  constructor(private http: HttpClient,
              private afStorage: AngularFireStorage) { }

  getSubmissionAttachments(submissionId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${environment.getSubmissionAttachmentsEndpointURL}/${submissionId}`)
        .subscribe( (data: IattachmentsResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  downloadAttachmentMetadata(attachmentsURL: string): Promise<any> {
      const url = attachmentsURL.split(';')[1];
      console.log(url);
      return this.afStorage.ref(url).getMetadata().toPromise();
  }

  deleteUploadedAttachmentFromSubmission(storageURL: string): Promise<any> {
    const storageRef = this.afStorage.ref(storageURL);
    return storageRef.delete().toPromise();
  }

}
