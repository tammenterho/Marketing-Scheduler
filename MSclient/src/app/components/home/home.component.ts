import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  componentToShow: string = 'logregister';

  constructor(
    public auth: AuthService,
    private campaignService: CampaignService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Kuuntele loginSuccessful-tapahtumaa ja kutsu getCampaigns-metodia
    this.auth.loginSuccessful.subscribe(() => {
      const authToken = this.auth.getAuthToken();
      console.log('Received auth token:', authToken);

      // Käytä authTokenia pyynnöissä
      this.campaignService.getCampaigns().subscribe((campaigns) => {
        console.log('Campaigns:', campaigns);
      });
    });
  }

  navigateToUsers() {
    this.router.navigate(['/app-users']);
  }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  logOut() {
    window.localStorage.removeItem('auth_token');
    this.componentToShow = 'logregister';
    console.log('logged out');
  }

  onLogin(input: any): void {
    this.auth
      .request('POST', '/login', {
        login: input.login,
        password: input.password,
      })
      .subscribe({
        next: (response) => {
          // Käsittele onnistunutta vastausta
          //console.log('tässä response' + JSON.stringify(response));
          this.auth.setLogin(response);
          this.auth.setAuthToken(response.token);
          //console.log('user tässä ' + response.login);
          this.componentToShow = 'data';
          this.auth.onLoginSuccess();
          console.log('log in succesful');

          this.snackBar.open('Kirjattu sisään', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
        },
        error: (error) => {
          // Käsittele virhettä
          console.error(error);

          this.snackBar.open('Väärä salasana tai tunnus', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar'],
          });
        },
        complete: () => {},
      });
  }

  onRegister(input: any): void {
    console.log('Current auth token:', this.auth.getAuthToken()); // Tarkista, että metodi kutsutaan

    this.auth
      .request('POST', '/register', {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password,
        email: input.email,
        phone: input.phone,
        company: input.company,
      })
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response); // Tulosta vastaus konsoliin
          this.auth.setAuthToken(response.token);
          this.componentToShow = 'logregister';

          this.snackBar.open('Rekisteröinti onnistui! Kirjaudu sisään', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
        },

        error: (error) => {
          console.error('Registration error:', error); // Tulosta virhe konsoliin
          this.auth.setAuthToken(null);
          this.componentToShow = 'logregister';

          this.snackBar.open('Username ei kelpaa', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar'],
          });
        },
        complete: () => {
          console.log('Registration complete'); // Tarkista, että complete-lohko suoritetaan
          this.componentToShow = 'logregister';
        },
      });
  }
}
