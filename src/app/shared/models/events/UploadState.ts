import {EuploadAction} from '../../enums/Eupload-action.enum';

export class UploadState {
  fileIndex: number;
  fileURL: string;
  uploadState: EuploadAction;

  constructor(_fileIndex: number, _fileURL: string, _uploadState: EuploadAction) {
    this.fileIndex = _fileIndex;
    this.fileURL = _fileURL;
    this.uploadState = _uploadState;
  }
}
