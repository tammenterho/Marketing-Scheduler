import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  sendEmail() {
    console.log(this.forgotForm.value);
  }
}
