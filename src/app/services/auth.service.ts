import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  auth: Auth = inject(Auth);

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log({ nombre, email, password });
      return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
