import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../../interfaces/session';
import { Institut } from '../../interfaces/institut';
import { Level } from '../../interfaces/level';
import { Test } from '../../interfaces/test';
import { Exam } from '../../interfaces/exam';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.scss']
})

export class SessionCreateComponent implements OnInit {
  titlePage: string = "Ajouter une session";
  instituts?: Institut[];
  levels?: Level[];
  tests?: Test[];
  exams?: Exam[];
  sessionCreate: boolean = false;

  newsession: Session = {
    _id: "",
    label: '',
    description: '',
    date: new Date(),
    nbPlaces: 0,
    institut: {} as Institut,
    exams: [],
    level: {} as Level,
    test: {} as Test,
    inscrit: [],
    nbInscrit: 0
  };

  ngOnInit() {
    this.sessionService.getLevels().subscribe(l => this.levels = l);
    this.sessionService.getInstituts().subscribe(l => this.instituts = l);
    this.sessionService.getTest().subscribe(l => this.tests = l);
    this.sessionService.getExams().subscribe(l => this.exams = l);
  }

  constructor(private sessionService: SessionService) { }

  addSession() {
    this.sessionService.addSession(this.newsession).subscribe(n => {
      console.log("Nouvelle Session : " + n);
      this.sessionCreate = true;
      this.newsession = {
        _id: "",
        label: '',
        description: '',
        date: new Date(),
        nbPlaces: 0,
        institut: {} as Institut,
        exams: [],
        level: {} as Level,
        test: {} as Test,
        inscrit: [],
        nbInscrit: 0
      };

      setInterval(() => {
        this.sessionCreate = false;
      }, 3000)
    })
  }
}
