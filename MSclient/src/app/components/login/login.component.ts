import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginFormComponent {
  // output lähettää parentille formin kun klikkaa submit
  // event emitteriä käytetään jos lähetettävä on monimutkainen eli ei esim yksi merkkijono vaan formi

  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  active: string = 'login';
  firstName: string = '';
  lastName: string = '';
  login: string = '';
  password: string = '';
  email: string = '';
  // phone: string = '';
  // company: string = '';

  onLoginTab(): void {
    this.active = 'login';
  }

  onRegisterTab(): void {
    this.active = 'register';
  }

  // pitää vielä määritellä milloin lähetetään. Ylempänä vasta otettiin käyttöön ja nyt käytetään.
  // määritellään myös mikä formissa on mikäkin

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({
      login: this.login,
      password: this.password,
    });
  }

  onSubmitRegister(): void {
    console.log('register klikattu');
    console.log('First Name:', this.email);
    this.onSubmitRegisterEvent.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
      email: this.email,
    });
  }
}
