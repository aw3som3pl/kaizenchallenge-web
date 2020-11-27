export interface IuserUpdateRequest {
  id: number;
  employeeId: string;
  name: string;
  surname: string;
  thumbnailUrl: string;
  experience: number;
  role: number;
  areas: number[];
  state: string;
}
