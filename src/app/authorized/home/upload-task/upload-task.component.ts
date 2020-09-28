import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {finalize, take, takeLast} from 'rxjs/operators';
import {UploadState} from '../../../shared/models/events/UploadState';
import {EuploadAction} from '../../../shared/enums/Eupload-action.enum';
import {UploadRequest} from '../../../shared/models/events/UploadRequest';


@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() uploadRequest: UploadRequest;
  @Output() uploadAction = new EventEmitter<UploadState>();

  euploadAction = EuploadAction;

  task: AngularFireUploadTask;

  path: string;
  storageRef: any;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: void | string;

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) {}

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

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
      })
    );

    this.percentage.subscribe( percentChange => {
      if (percentChange === 100){
        this.emitUploadAction(this.uploadRequest.fileIndex, this.path, EuploadAction.SUCCESSFUL);
      }
    });
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  emitUploadAction(fileIndex: number, fileURL: string, uploadAction: EuploadAction){
    this.uploadAction.emit(new UploadState(fileIndex, fileURL, uploadAction));
  }

  deleteFile() {
    this.storageRef.delete().pipe(take(1)).subscribe( deleted => {
      this.uploadAction.emit(new UploadState(this.uploadRequest.fileIndex, null, EuploadAction.DELETED));
    });
  }

}
