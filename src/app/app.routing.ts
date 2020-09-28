import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StaticElementsComponent} from './authorized/static-elements/static-elements.component';
import {IsAuthenticatedGuard} from './shared/guards/is-authenticated.guard';
import {HomeComponent} from './authorized/home/home.component';
import {IsAdminGuard} from './shared/guards/is-admin.guard';
import {SubmissionSearchComponent} from './authorized/submission-search/submission-search.component';
import {SubListingComponent} from './authorized/submission-search/sub-listing/sub-listing.component';
import {SubContentComponent} from './authorized/submission-search/sub-content/sub-content.component';
import {SubReviewsComponent} from './authorized/submission-search/sub-reviews/sub-reviews.component';
import {SubCommentsComponent} from './authorized/submission-search/sub-comments/sub-comments.component';
import {SubAttachmentsComponent} from './authorized/submission-search/sub-attachments/sub-attachments.component';
import {SubLikesComponent} from './authorized/submission-search/sub-likes/sub-likes.component';
import {SubmissionResultsComponent} from './authorized/submission-results/submission-results.component';
import {CommunicatorComponent} from './authorized/communicator/communicator.component';
import {KnowledgebaseComponent} from './authorized/knowledgebase/knowledgebase.component';
import {NotificationsComponent} from './authorized/notifications/notifications.component';
import {UsersComponent} from './authorized/users/users.component';
import {CreativityRankingComponent} from './authorized/creativity-ranking/creativity-ranking.component';
import {OeeSimulatorComponent} from './authorized/oee-simulator/oee-simulator.component';
import {AdminPanelComponent} from './authorized/admin-panel/admin-panel.component';
import {NgModule} from '@angular/core';



const routes: Routes = [
  { path: '' , component: LoginComponent},
  { path: 'authenticated', canActivate: [IsAuthenticatedGuard], component: StaticElementsComponent,
    children: [
      {path: '', canActivate: [IsAuthenticatedGuard], component: HomeComponent},
      {path: 'home', canActivate: [IsAuthenticatedGuard], component: HomeComponent,
        children: [
          {path: 'submission-search', canActivate: [IsAuthenticatedGuard], component: SubmissionSearchComponent,
            children: [
              {path: 'sub-listing', canActivate: [IsAuthenticatedGuard], component: SubListingComponent},
              {path: 'sub-content', canActivate: [IsAuthenticatedGuard], component: SubContentComponent},
              {path: 'sub-reviews', canActivate: [IsAuthenticatedGuard], component: SubReviewsComponent},
              {path: 'sub-comments', canActivate: [IsAuthenticatedGuard], component: SubCommentsComponent},
              {path: 'sub-attachments', canActivate: [IsAuthenticatedGuard], component: SubAttachmentsComponent},
              {path: 'sub-likes', canActivate: [IsAuthenticatedGuard], component: SubLikesComponent},
            ]},
          {path: 'submission-results', canActivate: [IsAuthenticatedGuard], component: SubmissionResultsComponent},
        ]},
      {path: 'communicator', canActivate: [IsAuthenticatedGuard], component: CommunicatorComponent},
      {path: 'knowledgebase', canActivate: [IsAuthenticatedGuard], component: KnowledgebaseComponent},
      {path: 'notifications', canActivate: [IsAuthenticatedGuard], component: NotificationsComponent},
      {path: 'users', canActivate: [IsAuthenticatedGuard], component: UsersComponent},
      {path: 'creativity-ranking', canActivate: [IsAuthenticatedGuard], component: CreativityRankingComponent},
      {path: 'oee-simulator', canActivate: [IsAuthenticatedGuard], component: OeeSimulatorComponent},
      {path: 'admin-panel', canActivate: [IsAuthenticatedGuard, IsAdminGuard], component: AdminPanelComponent}
    ]},
  { path: 'login', component: LoginComponent },
// { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: '**', canActivate: [IsAuthenticatedGuard], component: LoginComponent },
];


export const routing = RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' });

