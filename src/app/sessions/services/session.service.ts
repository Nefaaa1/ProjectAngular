import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Session } from '../../interfaces/session';
import { Institut } from '../../interfaces/institut';
import { Level } from '../../interfaces/level';
import { Test } from '../../interfaces/test';
import { Exam } from '../../interfaces/exam';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.baseUrl + '/sessions')
  }

  getSession(id: string): Observable<Session> {
    return this.http.get<Session>(this.baseUrl + '/sessions/' + id)
  }

  getSessionByLabel(label: string): Observable<Session | undefined> {
    return this.getSessions().pipe(
      map(sessions => sessions.find(session => session.label === label))
    );
  }

  updateSession(updatedSession: Session): Observable<Session> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Session>(this.baseUrl + '/sessions/update/' + updatedSession._id, updatedSession, httpOptions);
  }

  addSession(newSession: Session): Observable<Session> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Session>(this.baseUrl + '/sessions/create', newSession, httpOptions);
  }


  deleteSession(session: Session): Observable<Session> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<Session>(this.baseUrl + '/sessions/delete/' + session._id, httpOptions);
  }


  getInstituts(): Observable<Institut[]> {
    return this.http.get<Institut[]>(this.baseUrl + '/instituts');
  }

  getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.baseUrl + '/levels');
  }

  getTest(): Observable<Test[]> {
    return this.http.get<Test[]>(this.baseUrl + '/tests');
  }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.baseUrl + '/exams');
  }
}
