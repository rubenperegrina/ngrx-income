import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ni-login',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  uiSubscription!: Subscription;

  fb = inject(FormBuilder);
  autService = inject(AuthService);
  router = inject(Router);
  store: Store<AppState> = inject(Store<AppState>);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['ruben1@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      console.log('cargando subs')
      this.isLoading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;
    this.store.dispatch(ui.isLoading());

    const { correo, password } = this.loginForm.value;
    this.autService.loginUsuario(correo, password).then(
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
      })
  }
}
