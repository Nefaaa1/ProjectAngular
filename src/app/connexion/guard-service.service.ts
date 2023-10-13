import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardServiceService {


  constructor(private aS: AuthServiceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any | boolean {
    const requestedRoute = route.routeConfig!.path;
    const routeOnConnexion = ['sessions', 'sessionscreate', 'sessions/edit/:id', 'sessions/:id', 'sessions/delete/:id', 'users', 'userscreate', 'users/:id', 'users/edit/:id', 'users/delete/:id'];
    if (routeOnConnexion.includes(requestedRoute!)) {
      if (this.aS.returnConnexion()) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }


  }
}
