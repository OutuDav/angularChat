import { Routes } from '@angular/router';
import { LoginPage } from './pages/logins/logins.page';
import { IsUserLoggedIn } from './core/guards/is-user-logged-in.guard';
import { RoomsPage } from './pages/rooms/rooms.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'room/:roomName',
    canActivate: [IsUserLoggedIn],
    component: RoomsPage,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
