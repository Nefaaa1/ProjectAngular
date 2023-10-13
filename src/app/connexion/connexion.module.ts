import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionPageComponent } from './connexion-page/connexion-page.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GuardServiceService } from './guard-service.service';

const connexionRoutes: Routes = [
  { path: '', component: ConnexionPageComponent },

];

@NgModule({
  declarations: [
    ConnexionPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(connexionRoutes),
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class ConnexionModule { }
