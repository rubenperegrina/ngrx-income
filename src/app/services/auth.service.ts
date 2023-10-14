import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);

  initAuthListener() {
    this.auth.onAuthStateChanged(user => {
      console.log(user);
    })
  }

  crearUsuario(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser: User = { name, email: user.email!, uid: user.uid };
        const collectionRef = collection(this.firestore, `${user.uid}`);
        const documentRef = doc(collectionRef, 'users');
        setDoc(documentRef, newUser);
      })
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isAuth() {
    return new Observable((subscriber) => {
      const unsubscribe = this.auth.onAuthStateChanged(subscriber);
      return { unsubscribe };
    }).pipe(map((fUser) => fUser != null));
  }
}
