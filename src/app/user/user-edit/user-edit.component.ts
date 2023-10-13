import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  titlePage: string = "Modifier un utilisateur";

  user: User | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.userService.getUser(idParam).subscribe(u => this.user = u);
    }
  }

  updateuser(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(updatedUser => {
        console.log('User mise à jour :', updatedUser);
      })
    }
  }

}
