import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';
import { routes } from './users.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsersComponent, 
    UserComponent
  ],
  providers: [UsersService]
})
export class UsersModule { }
