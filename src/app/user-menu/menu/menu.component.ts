import { Component } from '@angular/core';
import { AuthServiceService } from '../../connexion/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  UserRole!: string;
  constructor(private auth: AuthServiceService) {
    this.UserRole = "";
  }

  UserConnexion(): boolean {
    this.loadRole()
    return this.auth.returnConnexion();
  }

  Deconnexion(): void {
    this.auth.unauth();
  }

  loadRole(): void {
    this.UserRole = this.auth.user.role;
  }
}
