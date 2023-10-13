import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from './connexion/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'get-tested';
  heure?: Observable<Date>;

  constructor(private auth: AuthServiceService) {


  }

  ngOnInit() {
    this.heure = interval(1000).pipe(
      map(() => new Date())
    );
  }
}
