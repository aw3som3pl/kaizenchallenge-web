
import {Iattachment} from './interfaces/iattachment';

export class Attachment implements Iattachment{

  attachmentName: string;
  attachmentSize: string;
  attachmentType: string;
  attachmentDescription: string;
  attachmentURL: string;
  attachmentStorageRef: string;
  attachmentUploadDate: string;

  constructor(attachmentName: string, attachmentSize: string, attachmentType: string, attachmentDescription: string, attachmentURL: string, attachmentStorageRef: string, attachmendUploadDate: string) {
    this.attachmentName = attachmentName;
    this.attachmentSize = attachmentSize;
    this.attachmentType = attachmentType;
    this.attachmentDescription = attachmentDescription;
    this.attachmentURL = attachmentURL;
    this.attachmentStorageRef = attachmentStorageRef;
    this.attachmentUploadDate = attachmendUploadDate;
  }

}
