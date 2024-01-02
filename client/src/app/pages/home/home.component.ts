import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCampaignComponent } from 'src/app/components/create-campaign/create-campaign.component';
import { CampaignsComponent } from 'src/app/components/campaigns/campaigns.component';
import { AuthService } from 'src/app/services/auth.service';
import { UsersComponent } from 'src/app/components/users/users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CreateCampaignComponent,
    CampaignsComponent,
    UsersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent implements OnInit {
  color: string = 'bg-lime-600';
  text: string = 'Show';
  showAddCampaign: boolean = false;
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
    const storedIsAdmin = localStorage.getItem('isAdmin');
    this.isAdmin = storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
  }

  showCreate() {
    this.showAddCampaign = !this.showAddCampaign;
    console.log('nappi ' + this.showAddCampaign);

    if (this.color === 'bg-lime-600' && this.text === 'Show') {
      this.color = 'bg-red-600';
      this.text = 'Hide';
    } else {
      this.color = 'bg-lime-600';
      this.text = 'Show';
    }
  }
}
