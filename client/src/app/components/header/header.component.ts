import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  user: string = localStorage.getItem('company') || '';
  isLoginPage: boolean = true;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
    this.user = localStorage.getItem('company') || '';
  }

  logout() {
    try {
      localStorage.removeItem('user_id');
      localStorage.removeItem('company');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      localStorage.removeItem('isAdmin');
      this.authService.isLoggedIn$.next(false);
      this.toastr.success('Logged out!');
    } catch (error) {
      this.toastr.error('Could not log out!');
    }
  }

  toggleLoginPage() {
    if (this.isLoginPage === true) {
      this.isLoginPage = false;
    } else {
      this.isLoginPage = true;
    }

    console.log(this.isLoginPage);
  }
}
