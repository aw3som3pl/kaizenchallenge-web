export interface IsubmissionListingRequest {
  type: number[];
  areas: number[];
  category: number[];
  status: number[];
  timestampSearchStart: string;
  timestampSearchEnd: string;
  orderBy: number[];
  authorType: number;
  startIndex: number;
  batchSize: number;
}
