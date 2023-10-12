import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  auth: Auth = inject(Auth);

  initAuthListener() {
    this.auth.onAuthStateChanged(user => {
      console.log(user);
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return new Observable((subscriber) => {
      const unsubscribe = this.auth.onAuthStateChanged(subscriber);
      return { unsubscribe };
    }).pipe(map((fUser) => fUser != null));
  }
}
