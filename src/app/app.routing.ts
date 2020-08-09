import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';



const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
// { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: '**', component: HomeComponent },
];

export const routing = RouterModule.forRoot(routes);

