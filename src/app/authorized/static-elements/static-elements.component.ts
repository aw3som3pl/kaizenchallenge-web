import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarService} from './service/sidebar.service';
import {AuthService} from '../../shared/services/auth.service';
import {SessionService} from '../../shared/services/session.service';

@Component({
  selector: 'app-static-elements',
  templateUrl: './static-elements.component.html',
  styleUrls: ['./static-elements.component.css']
})
export class StaticElementsComponent implements OnInit {


  public menuSelector = MenuSelection;
  public currentSelection;

  sidebarOpen = true;
  starRating = 4;

  constructor(private router: Router,
              private sidebarService: SidebarService,
              public sessonService: SessionService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentSelection = this.determineCurrentMenuSelection(this.router.url.split('/')[2]);

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          const currentSelection = this.router.url.split('/')[2];
          this.currentSelection = this.determineCurrentMenuSelection(currentSelection);
        }
      }
    );

    this.sidebarService.isSidebarVisible.subscribe((isVisible: boolean) => {
      this.sidebarOpen = isVisible;
    });
  }

  toggleNavbar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigateToAdminPanel(): void {
    this.router.navigate(['authenticated/admin-panel']).then( success => {
    },
      failure => {

      });
  }
  navigateToSubmissions(): void {
    this.router.navigate(['authenticated/home']).then( success => {
      },
      failure => {

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
