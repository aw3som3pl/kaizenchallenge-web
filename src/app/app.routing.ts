import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StaticElementsComponent} from './authorized/static-elements/static-elements.component';
import {IsAuthenticatedGuard} from './shared/guards/is-authenticated.guard';
import {HomeComponent} from './authorized/home/home.component';
import {SubmissionSearchComponent} from './authorized/home/submission-search/submission-search.component';
import {SubmissionResultsComponent} from './authorized/home/submission-results/submission-results.component';
import {CommunicatorComponent} from './authorized/communicator/communicator.component';
import {KnowledgebaseComponent} from './authorized/knowledgebase/knowledgebase.component';
import {UsersComponent} from './authorized/users/users.component';
import {CreativityRankingComponent} from './authorized/creativity-ranking/creativity-ranking.component';
import {OeeSimulatorComponent} from './authorized/oee-simulator/oee-simulator.component';
import {AdminPanelComponent} from './authorized/admin-panel/admin-panel.component';
import {SubmissionCreateComponent} from './authorized/home/submission-create/submission-create.component';
import {SearchSubmissionViewComponent} from './authorized/home/submission-search/search-submission-view/search-submission-view.component';
import {SearchListingComponent} from './authorized/home/submission-search/search-listing/search-listing.component';
import {UsersListingComponent} from './authorized/users/users-search/users-listing/users-listing.component';
import {UsersDetailsComponent} from './authorized/users/users-search/users-details/users-details.component';
import {UsersSearchComponent} from './authorized/users/users-search/users-search.component';



const routes: Routes = [
  { path: '' , component: LoginComponent},
  { path: 'authenticated', canActivate: [IsAuthenticatedGuard], component: StaticElementsComponent,
    children: [
      {path: '', canActivate: [IsAuthenticatedGuard], component: HomeComponent},
      {path: 'home', canActivate: [IsAuthenticatedGuard], component: HomeComponent,
        children: [
          {path: 'create', canActivate: [IsAuthenticatedGuard], component: SubmissionCreateComponent},
          {path: 'search', canActivate: [IsAuthenticatedGuard], component: SubmissionSearchComponent,
            children: [
              {path: 'listing', canActivate: [IsAuthenticatedGuard], component: SearchListingComponent},
              {path: 'submission', canActivate: [IsAuthenticatedGuard], component: SearchSubmissionViewComponent},
            ]},
          {path: 'results', canActivate: [IsAuthenticatedGuard], component: SubmissionResultsComponent},
        ]},
      {path: 'communicator', canActivate: [IsAuthenticatedGuard], component: CommunicatorComponent},
      {path: 'knowledgebase', canActivate: [IsAuthenticatedGuard], component: KnowledgebaseComponent},
      {path: 'users', canActivate: [IsAuthenticatedGuard], component: UsersComponent,
      children: [
        {path: 'search', canActivate: [IsAuthenticatedGuard], component: UsersSearchComponent,
        children: [
          {path: 'listing', canActivate: [IsAuthenticatedGuard], component: UsersListingComponent},
          {path: 'user', canActivate: [IsAuthenticatedGuard], component: UsersDetailsComponent},
        ]},
      ]},
      {path: 'creativity-ranking', canActivate: [IsAuthenticatedGuard], component: CreativityRankingComponent},
      {path: 'oee-simulator', canActivate: [IsAuthenticatedGuard], component: OeeSimulatorComponent},
      {path: 'admin-panel', canActivate: [IsAuthenticatedGuard], component: AdminPanelComponent}
    ]},
  { path: 'login', component: LoginComponent },
// { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: '**', canActivate: [IsAuthenticatedGuard], component: LoginComponent },
];


export const routing = RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' });

