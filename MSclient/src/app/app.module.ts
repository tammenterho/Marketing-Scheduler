import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { CampaignItemComponent } from './components/campaign-item/campaign-item.component';
import { CampaignFormComponent } from './components/campaign-form/campaign-form.component';
import { CampaignDialogComponent } from './components/campaign-dialog/campaign-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/login/login.component';
import { provideRouter } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddButtonComponent,
    CampaignsComponent,
    AddCampaignComponent,
    CampaignItemComponent,
    CampaignFormComponent,
    CampaignDialogComponent,
    LoginFormComponent,
    HomeComponent,
    FooterComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    TableModule,
    TooltipModule,
    RadioButtonModule,
    AuthModule.forRoot({
      domain: '{yourDomain}',
      clientId: '{yourClientId}',
      authorizationParams: { redirect_uri: window.location.origin },
    }),
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [[AuthService], provideRouter([])],
  bootstrap: [AppComponent],
})
export class AppModule {}
