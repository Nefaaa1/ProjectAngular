import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users')
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/' + id)
  }

  addUser(newUser: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(this.baseUrl + '/users/create', newUser, httpOptions);
  }

  deleteUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<User>(this.baseUrl + '/users/delete/' + user._id, httpOptions);
  }

  updateUser(newuser: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<User>(this.baseUrl + '/users/update/' + newuser._id, newuser, httpOptions);
  }
}
