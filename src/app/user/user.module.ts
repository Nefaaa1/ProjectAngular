import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BorderCardDirective } from './border-card.directive';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { GuardServiceService } from '../connexion/guard-service.service';

const sessionRoutes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [GuardServiceService] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [GuardServiceService] },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [GuardServiceService] },
  { path: 'userscreate', component: UserCreateComponent, canActivate: [GuardServiceService] },

];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    BorderCardDirective,
    UserCreateComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(sessionRoutes),
    FormsModule
  ],
  exports: [
    UserListComponent,
    RouterModule
  ]
})
export class UserModule { }
