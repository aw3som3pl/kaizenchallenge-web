
import {IsubmissionUpdate} from './interfaces/isubmission-update';

export class SubmissionUpdate implements IsubmissionUpdate{

  additional: string;
  additionalUnit: number;
  additionalValue: number;
  areas: [];
  attachment: string[];
  category: number;
  description: string;
  submissionId: number;
  topic: string;

  constructor(additional: string, additionalUnit: number, additionalValue: number, areas: [], attachment: string[], category: number, description: string, submissionId: number, topic: string) {
    this.additional = additional;
    this.additionalUnit = additionalUnit;
    this.additionalValue = additionalValue;
    this.areas = areas;
    this.attachment = attachment;
    this.category = category;
    this.description = description;
    this.submissionId = submissionId;
    this.topic = topic;
  }

}
