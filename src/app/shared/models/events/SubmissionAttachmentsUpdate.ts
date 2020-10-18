export class SubmissionAttachmentsUpdate {

  public areAttachmentsUploaded: boolean;
  public attachmentsCount: number | null;
  public attachmentURLs: string[];

  constructor(areAttachmentsUploaded: boolean, attachmentsCount: number | null, attachmentURLs: string[]) {
    this.areAttachmentsUploaded = areAttachmentsUploaded;
    this.attachmentsCount = attachmentsCount;
    this.attachmentURLs = attachmentURLs;
  }

}
