import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../user.service';

import { AuthServiceService } from 'src/app/connexion/auth-service.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  titlePage: string = "Get-Tested : liste des utilisateurs";
  users: User[] = [];
  UserRole!: string;

  constructor(private userService: UserService, private auth: AuthServiceService) { }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(u => this.users = u);
    this.UserRole = this.auth.user.role;
  }

  deleteUser(user: User): void {
    if (window.confirm("Voulez-vous vraiment supprimer l'utilisateur " + user.username + " ?")) {
      this.userService.deleteUser(user).subscribe(DeletedUser => {
        console.log('User supprimer :', DeletedUser);
        this.users = [];
        this.userService.getUsers().subscribe(u => this.users = u);
      })
    }

  }
}
