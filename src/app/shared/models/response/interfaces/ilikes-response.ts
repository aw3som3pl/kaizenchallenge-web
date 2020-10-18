import {Ireviewer} from '../../interfaces/ireviewer';
import {Ilike} from '../../interfaces/ilike';

export interface IlikesResponse {
 likes: [Ilike];
 likesCount: number;
}
