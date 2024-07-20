import { Component, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide = signal(true);


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }
  proceedLogin() {
    if (this.loginForm && this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username);
    }
  }

  clickEvent(event: MouseEvent) {
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
}
