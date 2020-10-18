import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {finalize, take} from 'rxjs/operators';
import {UploadRequest} from '../../../../../../shared/models/events/UploadRequest';
import {UploadState} from '../../../../../../shared/models/events/UploadState';
import {EuploadAction} from '../../../../../../shared/enums/Eupload-action.enum';


@Component({
  selector: 'upload-task-edit',
  templateUrl: './upload-task-edit.component.html',
  styleUrls: ['./upload-task-edit.component.scss']
})
export class UploadTaskEditComponent implements OnInit {

  @Input() uploadRequest: UploadRequest;
  @Output() uploadAction = new EventEmitter<UploadState>();

  euploadAction = EuploadAction;

  task: AngularFireUploadTask;

  path: string;
  storageRef: any;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) {}

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    this.emitUploadAction(this.uploadRequest.fileIndex, null, EuploadAction.UPLOADING);
    // The storage path
    this.path = `test/${Date.now()}_${this.uploadRequest.file.name}`;

    // Reference to storage bucket
    this.storageRef = this.afStorage.ref(this.path);

    // The main task
    this.task = this.storageRef.put(this.uploadRequest.file, {
      customMetadata: {
        'description': this.uploadRequest.fileDescription,
        'type': this.uploadRequest.fileType
      }
    });
    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await this.storageRef.getDownloadURL().toPromise();
        this.emitUploadAction(this.uploadRequest.fileIndex, `${this.downloadURL};${this.path}`, EuploadAction.SUCCESSFUL);
      })
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  emitUploadAction(fileIndex: number, fileURL: string | null, uploadAction: EuploadAction){
    console.log('UPLOAD ACTION: ' + uploadAction.toString() + ' INDEX: ' + fileIndex + ' URL: ' + fileURL);
    this.uploadAction.emit(new UploadState(fileIndex, fileURL, uploadAction));
  }

  deleteFile() {
    this.storageRef.delete().pipe(take(1)).subscribe( deleted => {
      this.uploadAction.emit(new UploadState(this.uploadRequest.fileIndex, null, EuploadAction.DELETED));
    });
  }

}
