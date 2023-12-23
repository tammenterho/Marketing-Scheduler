import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
})
export class CampaignsComponent implements OnInit {
  campaignService = inject(CampaignService); // kun injektoi niin ei tarvitse contstructoria
  campaigns: any[] = [];
  currentDate = Date.now();
  pastCampaigns: any[] = [];
  currentCampaigns: any[] = [];
  filteredCampaigns: any[] = [];
  allBtnColor: string = 'bg-green-500';
  pastBtnColor: string = 'bg-gray-500';
  currentBtnColor: string = 'bg-gray-500';
  upcomingBtnColor: string = 'bg-gray-500';

  ngOnInit(): void {
    this.getAllCampaigns();
  }

  getAllCampaigns() {
    const userId = localStorage.getItem('user_id') || '';

    this.campaignService.getCampaignsService(userId).subscribe({
      next: (res: any) => {
        this.campaigns = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllButton() {
    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-green-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-gray-500';

    this.filteredCampaigns = this.campaigns;
  }

  getPastCampaigns() {
    console.log('past clicked');
    this.pastBtnColor = 'bg-green-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-gray-500';

    this.pastCampaigns = this.campaigns.filter(
      (campaign) => new Date(campaign.adend).getTime() < this.currentDate
    );
    console.log(this.pastCampaigns);
    this.filteredCampaigns = this.pastCampaigns;
  }

  getCurrentCampaigns() {
    console.log('current clicked');

    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-green-500';
    this.upcomingBtnColor = 'bg-gray-500';

    this.currentCampaigns = this.campaigns.filter((campaign) => {
      const startDate = new Date(campaign.adstart).getTime();
      const endDate = new Date(campaign.adend).getTime();
      const now = this.currentDate;

      // Tarkista, onko alkamisaika mennyt ja loppumisaika on tulossa
      return startDate < now && now < endDate;
    });

    console.log(this.currentCampaigns);
    this.filteredCampaigns = this.currentCampaigns;
  }
  getUpcomingCampaigns() {
    console.log('upcoming clicked');

    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-green-500';

    this.currentCampaigns = this.campaigns.filter((campaign) => {
      const startDate = new Date(campaign.adstart).getTime();

      const now = this.currentDate;

      // Tarkista, onko alkamisaika mennyt ja loppumisaika on tulossa
      return now < startDate;
    });

    console.log(this.currentCampaigns);
    this.filteredCampaigns = this.currentCampaigns;
  }
}
