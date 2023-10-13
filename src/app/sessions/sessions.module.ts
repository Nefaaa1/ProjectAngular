import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionCardComponent } from './session-card/session-card.component';
import { BorderCardDirective } from './border-card.directive';
import { TagColorPipe } from './tag-color.pipe';

import { Routes, RouterModule } from '@angular/router';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { FormsModule } from '@angular/forms';

import { SessionEditComponent } from './session-edit/session-edit.component';
import { SessionCreateComponent } from './session-create/session-create.component';
import { SessionDeleteComponent } from './session-delete/session-delete.component';
import { PaginateComponent } from '../paginate/paginate.component';
import { GuardServiceService } from '../connexion/guard-service.service';

const sessionRoutes: Routes = [
  { path: 'sessions', component: SessionsListComponent, canActivate: [GuardServiceService] },
  { path: 'sessions/:id', component: SessionDetailComponent, canActivate: [GuardServiceService] },
  { path: 'sessions/edit/:id', component: SessionEditComponent, canActivate: [GuardServiceService] },
  { path: 'sessionscreate', component: SessionCreateComponent, canActivate: [GuardServiceService] },
  { path: 'sessions/delete/:id', component: SessionDeleteComponent, canActivate: [GuardServiceService] }

];

@NgModule({
  declarations: [
    SessionsListComponent,
    SessionCardComponent,
    BorderCardDirective,
    TagColorPipe,
    SessionDetailComponent,
    SessionEditComponent,
    SessionCreateComponent,
    SessionDeleteComponent,
    PaginateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(sessionRoutes),
    FormsModule,

  ],
  exports: [
    SessionsListComponent,
    RouterModule,
    PaginateComponent
  ]
})
export class SessionsModule { }
