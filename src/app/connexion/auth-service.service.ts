import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  users: User[] = [];
  user!: User;
  private onConnexion = false;
  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsers().subscribe(u => this.users = u);
  }

  auth(email: string, password: string): Promise<any> {
    const user = this.users.find(u => email === u.email && password === u.password);
    if (user) {
      this.user = user;
      return Promise.resolve(user);
    } else {
      this.onConnexion = false;
      return Promise.reject('Identifiants incorrects');
    }

  }

  unauth(): void {
    this.onConnexion = false;
    this.router.navigate(['']);
  }


  returnConnexion() {
    return this.onConnexion;
  }

  setOnConnexion(v: boolean): void {
    this.onConnexion = v;
  }
}