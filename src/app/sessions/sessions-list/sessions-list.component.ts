import { Component, OnInit, ViewChild } from '@angular/core';
import { Session } from '../../interfaces/session';
import { SessionService } from '../services/session.service';



@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {

  titlePage: string = "Get-Tested : liste des sessions";
  sessions: Session[] = [];

  ngOnInit(): void {
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);
  }

  constructor(private sessionService: SessionService) { }

  onSessionDeleted(v: boolean): void {
    console.log(this.sessions)
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);
  }

}
