import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ni-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  autService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { correo, password } = this.loginForm.value;
    this.autService.loginUsuario(correo, password).then(
      credentials => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          title: 'Oops...',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }
}
