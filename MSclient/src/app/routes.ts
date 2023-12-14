import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routeConfig: Routes = [];

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: HomeComponent },
];
