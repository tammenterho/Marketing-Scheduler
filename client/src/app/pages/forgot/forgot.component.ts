import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export default class ForgotComponent implements OnInit {
  forgotForm!: FormGroup;

  fb = inject(FormBuilder);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  sendEmail() {
    if (this.forgotForm.value.email === 'jaska.herrala@gmail.com') {
      console.log('Ei onnistu!');
    } else {
      this.authService.sendEmailService(this.forgotForm.value.email).subscribe({
        next: (res) => {
          alert(res.message);
          this.forgotForm.reset();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
