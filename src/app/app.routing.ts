import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StaticElementsComponent} from './authorized/static-elements/static-elements.component';
import {SubmissionComponent} from './authorized/submission/submission.component';
import {IsAuthenticatedGuard} from './shared/guards/is-authenticated.guard';



const routes: Routes = [
  { path: '' , canActivate: [IsAuthenticatedGuard], component: LoginComponent},
  { path: 'authenticated', canActivate: [IsAuthenticatedGuard], component: StaticElementsComponent,
    children: [
      {path: '', canActivate: [IsAuthenticatedGuard], component: SubmissionComponent},
      {path: 'submission', component: SubmissionComponent}
    ]
    },
  { path: 'login', component: LoginComponent },
// { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: '**', canActivate: [IsAuthenticatedGuard], component: LoginComponent },
];

export const routing = RouterModule.forRoot(routes);

