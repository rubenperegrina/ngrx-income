import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'ni-register',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  uiSubscription!: Subscription;

  fb = inject(FormBuilder);
  autService = inject(AuthService);
  router = inject(Router);
  store: Store<AppState> = inject(Store<AppState>);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      console.log('cargando subs')
      this.isLoading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if (this.registerForm.invalid) return;
    this.store.dispatch(ui.isLoading());

    const { nombre, correo, password } = this.registerForm.value;
    this.autService.crearUsuario(nombre, correo, password).then(
      credentials => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          title: 'Oops...',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
  }
}
