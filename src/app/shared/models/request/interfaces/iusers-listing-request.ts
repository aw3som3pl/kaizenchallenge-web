export interface IusersListingRequest {
  areas: number[] | null;
  roles: number[] | null;
  orderBy: number;
  startIndex: number;
  batchSize: number;
}
