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
export default class HomeComponent {
  color: string = 'bg-lime-600';
  text: string = 'Show';
  showAddCampaign: boolean = false;

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
