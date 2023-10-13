import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SessionsModule } from './sessions/sessions.module';
import { UserModule } from './user/user.module';
import { ConnexionModule } from './connexion/connexion.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MenuComponent } from './user-menu/menu/menu.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    SessionsModule,
    UserModule,
    ConnexionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  exports: [
    MenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
