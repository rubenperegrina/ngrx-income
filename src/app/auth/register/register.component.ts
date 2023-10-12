import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ni-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  autService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  crearUsuario() {
    if (this.registerForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { nombre, correo, password } = this.registerForm.value;
    this.autService.crearUsuario(nombre, correo, password).then(
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
      });
  }
}
