import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.scss']
})
export class ConnexionPageComponent {
  usernameOK: boolean = false;
  emailOK: boolean = false;
  connexionReussi = false;
  userConnexion = {
    email: "",
    password: "",
  };


  constructor(private auth: AuthServiceService, private router: Router) { }

  logUser() {
    this.auth.auth(this.userConnexion.email, this.userConnexion.password)
      .then(user => {
        console.log('Authentification réussie', user);
        this.connexionReussi = true;
        setTimeout(() => {
          this.auth.setOnConnexion(true);
          this.router.navigate(['/sessions']);
        }, 1500)
      })
      .catch(error => {
        console.error('Erreur d\'authentification:', error);
      });
  }
}
