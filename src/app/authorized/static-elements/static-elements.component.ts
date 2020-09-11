import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SidebarService} from './service/sidebar.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-static-elements',
  templateUrl: './static-elements.component.html',
  styleUrls: ['./static-elements.component.css']
})
export class StaticElementsComponent implements OnInit {

  sidebarOpen = true;
  navbarOpen = true;
  starRating = 4;

  constructor(private router: Router,
              private sidebarService: SidebarService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.sidebarService.isSidebarVisible.subscribe((isVisible: boolean) => {
      this.sidebarOpen = isVisible;
    });
  }

  toggleNavbar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onLogout(): void {
    this.authService.logout()
      .then( success => {
        this.router.navigate(['login']);
        },
        failure => {});
  }
}
