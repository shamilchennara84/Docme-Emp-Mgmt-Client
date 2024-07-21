import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  hide = signal(true);
  loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  proceedLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loginSubscription = this.authService
        .adminLogin(credentials)
        .subscribe({
          next: () => {
            this.toastr.success('Login successful!', 'Success');
            this.router.navigate(['/admin/employees']);
          },
          error: () => {
            this.toastr.error('Login failed. Please try again.', 'Error');
          },
        });
    }
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  checkEmpId(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      return 'Username required';
    } else if (formControl.hasError('minlength')) {
      return 'Please enter a valid employee ID';
    }
    return '';
  }
  checkPassword(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      return 'Password Required';
    } else if (formControl.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
