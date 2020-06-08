import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.userData = afAuth.authState;
  }

  loginByEmail(user: UserI) {
    const { email, password } = user;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
  }

  registerUser(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

}
