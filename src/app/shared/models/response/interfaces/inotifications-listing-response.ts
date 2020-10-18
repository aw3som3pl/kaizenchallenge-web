import {Inotification} from '../../interfaces/inotification';

export interface InotificationsListingResponse {
 notifications: [Inotification];
 notificationCount: number;
}
