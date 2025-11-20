import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registrar.html',
  styleUrls: ['./registrar.css'],
})
export class RegistrarPage {
  registerForm: FormGroup;
  showPassword1 = false;
  showPassword2 = false;
  apiError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
        pais: ['', Validators.required],
        terminos: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  /* Validador: password === confirmPassword */
  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl) => {
      const pass = form.get('password')?.value;
      const confirm = form.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    };
  }

  /*Mostrar/ocultar contraseña */
  togglePassword(field: string) {
    if (field === 'password1') {
      this.showPassword1 = !this.showPassword1;
    } else {
      this.showPassword2 = !this.showPassword2;
    }
  }

  /*Enviar formulario */
  onSubmit() {
    this.apiError = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = {
      nombre: this.registerForm.value.nombre,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      pais: this.registerForm.value.pais,
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('[Registro] Respuesta:', res);
        alert('¡Registro exitoso! Ahora inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('[Registro] Error:', err);
        this.apiError = err?.error?.message ?? 'Error al registrar. Intenta nuevamente.';
      },
    });
  }
}
