import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../data/services/auth.services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],

  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoginMode: boolean = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.root.get('password');
    if (passwordControl) {
      const passwordValue = passwordControl.value;
      const confirmPasswordValue = control.value;

      if (passwordValue !== confirmPasswordValue) {
        return { passwordMismatch: true };
      }
    }
    return null;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
  }

  register() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: () => {
          this.isLoading = false;
          this.toggleMode();
        },
      });
    }
  }

  login() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      this.router.navigate(['/']);
      return;
    } else {
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.toggleMode();
          },
        });
      }
    }
  }
}
