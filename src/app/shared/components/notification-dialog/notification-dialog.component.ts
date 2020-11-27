import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ParseService} from '../../parsers/parse.service';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../services/session.service';
import {Inotification} from '../../models/interfaces/inotification';
import {InotificationsListingResponse} from '../../models/response/interfaces/inotifications-listing-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  areNotificationsLoaded: boolean;
  notificationsCount = 0;
  notificationsListing: [Inotification] = null;

  constructor(private dialogRef: MatDialogRef<NotificationDialogComponent>,
              public parseService: ParseService,
              public sessionService: SessionService,
              public translate: TranslateService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit() {
    this.reloadNotifications();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close(this.getLoadedNotificationsIds());
  }

  reloadNotifications() {
    this.areNotificationsLoaded = false;
    this.sessionService.getActiveNotificationsList(0, 40)
      .then((success: InotificationsListingResponse) => {
        if (success.notificationCount === 0) {
          this.notificationsListing = null;
        } else {
          this.notificationsListing = success.notifications;
          this.notificationsCount = success.notificationCount;
          console.log(this.notificationsListing);
        }
        this.areNotificationsLoaded = true;
      },
          failure => {
            this.areNotificationsLoaded = true;
            this.notificationsListing = null;
            this.notificationsCount = 0;
          }
      );
  }

  openNotificationLink(url: string) {
    window.open(url, '_blank');
  }

  getLoadedNotificationsIds(): number[] {
    const notificationIds: number[] = [];

    if (this.notificationsListing) {
      for (const notification of this.notificationsListing) {
        notificationIds.push(notification.id);
      }
    }

    return notificationIds;
  }

  close() {
    this.dialogRef.close(this.getLoadedNotificationsIds());
  }
}
