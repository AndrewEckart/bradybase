import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Observable, of} from 'rxjs';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {MatSnackBar} from '@angular/material';
import {DatabaseService} from '../database/database.service';
import {BradybaseUser} from '../../../shared/models/bradybaseUser.model';
import {flatMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authState: User | null = null;
  public initialRoute: string;

  constructor(private af: AngularFireAuth,
              private db: DatabaseService,
              private sb: MatSnackBar,
              private router: Router
  ) {
    this.observeAuthState();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserObservable(): Observable<BradybaseUser | null> {
    return this.af.authState.pipe(
      flatMap((authState: User | null) => {
        if (!authState) {
          return of(null);
        }
        return this.db.object(`users/${authState.uid}`, BradybaseUser);
      })
    );
  }

  observeAuthState() {
    this.af.authState.subscribe((authState: User | null) => {
      this.authState = authState;

      if (this.authenticated) {
        this.fetchUserData();
      }
    });
  }

  signIn() {
    const provider: GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.af.auth.signInWithPopup(provider)
      .then((result) => {
        this.sb.open('Signed in as ' + result.user.email, null, {duration: 2000});
      })
      .catch((error) => console.error('Sign in error: ', error));
  }

  signOut() {
    this.af.auth.signOut().then(() => {
      this.sb.open('Signed out', null, {duration: 2000});
      this.router.navigate(['/']);
    });
  }

  fetchUserData() {
    const uid = this.authState.uid;
    this.db.object(`user/${uid}`, BradybaseUser).pipe(
      take(1)
    ).subscribe((user: BradybaseUser) => {
      if (!user) {
        this.saveNewUser();
      }
      this.setLastActive();
      this.navigate();
    });
  }

  saveNewUser() {
    const uid = this.authState.uid;
    const name = this.authState.displayName;
    const email = this.authState.email.toLowerCase();
    const photoURL = this.authState.photoURL;

    const user = new BradybaseUser({email, name, photoURL, uid});
    this.db.set(`users/${uid}`, user.save());
  }

  setLastActive() {
    this.db.set(`users/${this.currentUserId}/lastActive`, firebase.database.ServerValue.TIMESTAMP);
  }

  navigate() {
    this.router.navigate(this.initialRoute ? [this.initialRoute] : ['app/problems']);
  }


}
