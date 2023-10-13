import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  titlePage: string = "Ajouter un utilisateur";
  userCreate: boolean = false;
  newUser: User = {
    _id: "",
    username: '',
    password: '',
    email: '',
    role: ''
  };


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ajoutuser() {
    this.userService.addUser(this.newUser).subscribe(n => {
      console.log("Nouvelle Utilisateur : " + n);
      this.userCreate = true;
      this.newUser = {
        _id: "",
        username: '',
        password: '',
        email: '',
        role: ''
      };

      setInterval(() => {
        this.userCreate = false;
      }, 3000)
    })
  }

}
