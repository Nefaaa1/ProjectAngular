import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../../interfaces/session';
import { User } from '../../interfaces/user';
import { SessionService } from '../services/session.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

  session: Session | undefined = undefined;
  users?: User[];
  user?: User;
  user_id: string | null = null;
  sessionComplete: boolean = false;
  sessionInscrit: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.sessionService.getSession(idParam).subscribe(session => {
        this.session = session;
        this.getUserDetails(session.inscrit);
      });
    }
    this.userService.getUsers().subscribe(u => this.users = u);

  }

  getUserDetails(userId: string[]) {
    this.sessionInscrit = [];
    userId.forEach(id => {
      this.userService.getUser(id).subscribe((user) => {
        this.sessionInscrit.push(user);
      });
    })

    return this.user;
  }

  deleteInscrit(userId: string) {
    if (this.session && this.session.inscrit) {
      const index = this.session.inscrit.indexOf(userId);
      if (index !== -1) {
        this.sessionComplete = false;
        this.session.inscrit.splice(index, 1);
        this.session.nbInscrit = this.session.inscrit.length;
        this.sessionService.updateSession(this.session).subscribe(updatedSession => {
          console.log('Session mise à jour :', updatedSession);
        })
        this.getUserDetails(this.session.inscrit);
      }
    }
  }

  addUserToSession() {
    const selectedUserId = this.user_id;
    if (this.session && selectedUserId !== null) {
      if (this.session.nbInscrit < this.session.nbPlaces) {
        this.sessionComplete = false;
        if (!this.session.inscrit.includes(selectedUserId)) {
          if (this.session) {
            this.session.inscrit.push(selectedUserId);
            this.session.nbInscrit = this.session.inscrit.length;
            this.sessionService.updateSession(this.session).subscribe(updatedSession => {
              console.log('Session mise à jour :', updatedSession);
            })
            this.getUserDetails(this.session.inscrit);
          }

          this.user_id = null;
        }
      } else {
        this.sessionComplete = true;
      }

    }
  }
}


