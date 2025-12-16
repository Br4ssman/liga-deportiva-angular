import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-acceso',
  standalone: true,
  templateUrl: './acceso.html',
  styleUrls: ['./acceso.css'],
  imports: [ReactiveFormsModule]
})
export class Acceso {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      tipo: ['normal', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {

        const tipo = res.tipo;

        if (tipo === 'admin') {
          this.router.navigate(['/admin']);
        }
        else if (tipo === 'arbitro') {
          this.router.navigate(['/arbitro-dashboard']);
        }
        else if (tipo === 'capitan') {
          this.router.navigate(['/capitan-dashboard']);
        }
        else {
          this.router.navigate(['/usuario-dashboard']);
        }

      },
      error: (err) => {
        alert(err.error?.msg || 'Credenciales incorrectas');
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => alert('Usuario registrado correctamente'),
      error: (err) => alert(err.error?.msg || 'Error en registro')
    });
  }
}