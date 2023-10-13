import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../../interfaces/session';
import { Institut } from '../../interfaces/institut';
import { Level } from '../../interfaces/level';
import { Test } from '../../interfaces/test';
import { Exam } from '../../interfaces/exam';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.scss']
})
export class SessionEditComponent implements OnInit {
  titlePage: string = "Modifier une session";
  session: Session | undefined = undefined;
  instituts?: Institut[];
  levels?: Level[];
  tests?: Test[];
  exams?: Exam[];



  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.sessionService.getSession(idParam).subscribe(session => this.session = session);
    }
    this.sessionService.getLevels().subscribe(l => this.levels = l);
    this.sessionService.getInstituts().subscribe(l => this.instituts = l);
    this.sessionService.getTest().subscribe(l => this.tests = l);
    this.sessionService.getExams().subscribe(l => this.exams = l);
  }

  updateSession(): void {
    if (this.session) {
      this.sessionService.updateSession(this.session).subscribe(updatedSession => {
        console.log('Session mise à jour :', updatedSession);
      })
    }
  }
}
