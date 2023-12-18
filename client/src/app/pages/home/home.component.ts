import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCampaignComponent } from 'src/app/components/create-campaign/create-campaign.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CreateCampaignComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent {}
