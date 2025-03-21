import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserListComponent } from './pages/user-list-page/user-list.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { UserCardComponent } from './pages/user-card/user-card.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'user/:id', component: UserCardComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
];
