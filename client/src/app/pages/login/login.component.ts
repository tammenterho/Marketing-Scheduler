import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loading: boolean = false;

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

      password: ['', Validators.required],
    });
  }

  login() {
    this.loading = true;
    // console.log(this.loginForm.value);

    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        alert('Login is succesfull!');
        // console.log('id' + res.data._id);

        localStorage.setItem('user_id', res.data._id);
        localStorage.setItem('company', res.data.company);
        localStorage.setItem('firstname', res.data.firstName);
        localStorage.setItem('lastname', res.data.lastName);
        localStorage.setItem('isAdmin', res.data.isAdmin);

        // console.log('company:  ' + res.data.userName);
        this.authService.isLoggedIn$.next(true);

        this.router.navigate(['/home']);
        this.loginForm.reset();
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
        this.loading = false;
      },
    });
  }
}
