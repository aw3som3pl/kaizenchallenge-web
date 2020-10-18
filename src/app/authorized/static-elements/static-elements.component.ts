import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarService} from './service/sidebar.service';
import {AuthService} from '../../shared/services/auth.service';
import {SessionService} from '../../shared/services/session.service';
import {Subscription, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {IuserFull} from '../../shared/models/interfaces/iuserFull';
import {ParseService} from '../../shared/parsers/parse.service';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {NotificationDialogComponent} from '../../shared/components/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-static-elements',
  templateUrl: './static-elements.component.html',
  styleUrls: ['./static-elements.component.css']
})
export class StaticElementsComponent implements OnInit {

  private subscriptions: Subscription = new Subscription();

  public menuSelector = MenuSelection;
  public currenMenutSelection;

  public navbarSelector = NavbarSelection;
  public currentNavbarSelection;

  sidebarOpen = true;
  starRating = 0;

  // Notifications
  public activeNotificationsCount = 0;

  constructor(private router: Router,
              private sidebarService: SidebarService,
              public sessionService: SessionService,
              private authService: AuthService,
              public parseService: ParseService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currenMenutSelection = this.determineCurrentMenuSelection(this.router.url.split('/')[2]);
    this.currentNavbarSelection = this.determineCurrentNavbarSelection(this.router.url.split('/')[3]);

    const routerSubscription = this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          const currentMenuSelection = this.router.url.split('/')[2];
          const currentNavbarSelection = this.router.url.split('/')[3];
          this.currenMenutSelection = this.determineCurrentMenuSelection(currentMenuSelection);
          this.currentNavbarSelection = this.determineCurrentNavbarSelection(currentNavbarSelection);
        }
      }
    );

    const sidebarVisibleSubscription = this.sidebarService.isSidebarVisible.subscribe((isVisible: boolean) => {
      this.sidebarOpen = isVisible;
    });

    const userSessionTimerSubscription = timer(0, 15000).pipe(  // Co 10 sekund update
      switchMap(() => this.sessionService.fetchNewIdToken()))
      .subscribe((userData: IuserFull) => {
        console.log('USER UPDATED');
        this.activeNotificationsCount = userData.activeNotificationsCount;
        this.starRating = this.parseService.calculateStarCount(userData.experience);
      });

    this.subscriptions.add(routerSubscription);
    this.subscriptions.add(sidebarVisibleSubscription);
    this.subscriptions.add(userSessionTimerSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleNavbar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openNotificationsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'some data';

    const dialogRef = this.matDialog.open(NotificationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {

    });
  }

  navbarNavigateToSubmissionForm(): void {
    this.router.navigate(['authenticated/home/create']).then( success => {
    });
  }
  navbarNavigateToSubmissionSearch(): void {
    this.router.navigate(['authenticated/home/search/listing']).then( success => {
    });
  }navbarNavigateToSubmissionResults(): void {
    this.router.navigate(['authenticated/home/results']).then( success => {
    });
  }

  sidebarNavigateToAdminPanel(): void {
    this.router.navigate(['authenticated/admin-panel']).then( success => {
    });
  }
  sidebarNavigateToSubmissions(): void {
    this.router.navigate(['authenticated/home/create']).then( success => {
      });
  }
  sidebarNavigateToUsers(): void {
    this.router.navigate(['authenticated/users/search/listing']).then( success => {
    });
  }

  onLogout(): void {
    this.authService.logout()
      .then( success => {
        this.router.navigate(['login']);
        },
        failure => {});
  }

  determineCurrentMenuSelection(path: string): MenuSelection {
    switch (path){
      case 'home':
        return MenuSelection.SUBMISSIONS;
      case 'communicator':
        return MenuSelection.COMMUNICATOR;
      case 'knowledgebase':
        return MenuSelection.KNOWLEDGEBASE;
      case 'notifications':
        return MenuSelection.NOTIFICATIONS;
      case 'users':
        return MenuSelection.USERS;
      case 'creativity-ranking':
        return MenuSelection.CREATIVITY_RANKING;
      case 'oee-simulator':
        return MenuSelection.OEE_SIMULATOR;
      case 'admin-panel':
        return MenuSelection.ADMIN_PANEL;
    }
  }

  determineCurrentNavbarSelection(path: string): NavbarSelection {
    switch (path){
      case 'create':
        return NavbarSelection.SUBMISSION;
      case 'search':
        return NavbarSelection.SEARCH;
      case 'results':
        return NavbarSelection.RESULTS;
    }
  }
}

enum MenuSelection {
  SUBMISSIONS,
  COMMUNICATOR,
  KNOWLEDGEBASE,
  NOTIFICATIONS,
  USERS,
  CREATIVITY_RANKING,
  OEE_SIMULATOR,
  ADMIN_PANEL
}

enum NavbarSelection {
  SUBMISSION,
  SEARCH,
  RESULTS
}
