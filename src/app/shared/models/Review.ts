import {Ireview} from './interfaces/ireview';


export class Review implements Ireview{

  public reviewId: number;
  public reviewStatus: number;
  public reviewerMessage: string;
  public reviewerName: string;
  public timestampUpdated: string;

  constructor(init?: Partial<Review>) {
    Object.assign(this, init);
  }

}
