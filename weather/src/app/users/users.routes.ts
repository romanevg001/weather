import { Route, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

export const routes: Route[] = [
  { path: '', component: UsersComponent},
  { path: '/:id', component: UserComponent},

];

