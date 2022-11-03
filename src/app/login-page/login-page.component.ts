import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginData } from '../common/models/auth.interfaces';
import { AuthService } from '../common/services/auth.service';
import { login } from './actions/login.actions';
import { UserState } from './reducers';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<UserState>,
    private router: Router
  ) {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      email: ['trainee9@example.com', [Validators.required, Validators.email]],
      password: ['Trainee$9', Validators.required],
    });
  }

  getControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }

  onSubmit() {
    const credentials: LoginData = {
      data: this.form.value,
    };
    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.store.dispatch(
          login({
            user: res,
          })
        );
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.form.setErrors({
          statusRequest: false,
        });
      },
    });
  }
}
