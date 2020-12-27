import {IcreativityRankingListingRequest} from './interfaces/icreativity-ranking-listing-request';


export class CreativityRankingListingRequest implements IcreativityRankingListingRequest{

  batchSize: number;
  startIndex: number;
  areas: [];

  constructor(batchSize: number, startIndex: number, areas: []) {
    this.batchSize = batchSize;
    this.startIndex = startIndex;
    this.areas = areas;
  }

}
