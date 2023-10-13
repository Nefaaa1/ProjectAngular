import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
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
}
