import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private sb: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.authenticated) { return true; }
    this.auth.initialRoute = state.url;

    return this.auth.currentUserObservable.pipe(
      take(1),
      map(user => !!user),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.sb.open('Oops! You must be authenticated to access that page.',
            null, {duration: 3000});
          this.router.navigate(['/']);
        }
      })
    );
  }
}
