import {IapiError} from './interfaces/iapi-error';
import {InewSubmission} from './interfaces/inew-submission';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export class NewSubmission implements InewSubmission{

  additional: string;
  additionalUnit: number;
  additionalValue: number;
  area: [];
  attachment: string[];
  category: [];
  description: string;
  designatedReviewerId: number;
  topic: string;
  type: number;

  constructor(additional: string, additionalUnit: number, additionalValue: number, area: [], attachment: string[], category: [], description: string, designatedReviewerId: number, topic: string, type: number) {
    this.additional = additional;
    this.additionalUnit = additionalUnit;
    this.additionalValue = additionalValue;
    this.area = area;
    this.attachment = attachment;
    this.category = category;
    this.description = description;
    this.designatedReviewerId = designatedReviewerId;
    this.topic = topic;
    this.type = type;
  }

}
