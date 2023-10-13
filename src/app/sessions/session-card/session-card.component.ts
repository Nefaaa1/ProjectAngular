import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from '../../interfaces/session';
import { SessionService } from '../services/session.service';
import { AuthServiceService } from 'src/app/connexion/auth-service.service';

@Component({
  selector: 'sessionCard',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss']
})
export class SessionCardComponent {
  @Input() session: Session | null = null;
  @Output() sessionDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  UserRole!: string;

  constructor(private sessionService: SessionService, private auth: AuthServiceService) {
    this.UserRole = this.auth.user.role;
    console.log(this.auth.user.role)
  }

  deleteSession(session: Session): void {
    if (window.confirm("Voulez-vous vraiment supprimer la " + session.label + " ?")) {
      this.sessionService.deleteSession(session).subscribe(() => {
        this.sessionDeleted.emit(true);
      });
    }
  }
}
