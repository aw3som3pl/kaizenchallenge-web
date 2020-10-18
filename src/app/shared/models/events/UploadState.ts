import {EuploadAction} from '../../enums/Eupload-action.enum';

export class UploadState {
  fileIndex: number;
  fileURL: string | null;
  uploadState: EuploadAction;

  constructor(_fileIndex: number, _fileURL: string | null, _uploadState: EuploadAction) {
    this.fileIndex = _fileIndex;
    this.fileURL = _fileURL;
    this.uploadState = _uploadState;
  }
}
