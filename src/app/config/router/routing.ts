import { Routes } from '@angular/router';
import {LoginComponent} from "../../components/login.component/login.component";
import {SignupComponent} from "../../components/signup.component/signup.component";
import {AdminPanelComponent} from "../../components/admin.panel.component/admin.panel.component"

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent
  }
];
