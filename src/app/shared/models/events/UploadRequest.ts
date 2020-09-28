export class UploadRequest {

  public fileIndex: number;
  public file: File;
  public fileDescription: string;
  public fileType: string;

  constructor(_fileIndex: number, _file: File, _fileDescription: string) {
    this.fileIndex = _fileIndex;
    this.file = _file;
    this.fileDescription = _fileDescription;
    this.fileType = this.file.name.split('.').pop();
  }
}
