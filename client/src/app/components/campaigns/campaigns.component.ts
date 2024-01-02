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
  campaignsSize: number = 0;
  isAdmin: boolean = false;
  formattedDate: string = '';

  ngOnInit(): void {
    this.getAllCampaigns();
    const storedIsAdmin = localStorage.getItem('isAdmin');
    this.isAdmin = storedIsAdmin ? JSON.parse(storedIsAdmin) : false;

    const currentTime = Date.now();
    this.formattedDate = new Date(currentTime).toLocaleDateString('fi-FI');
    console.log('aika nyt' + this.formattedDate);
  }

  getAllCampaigns() {
    const userId = localStorage.getItem('user_id') || '';

    this.campaignService.getCampaignsService(userId).subscribe({
      next: (res: any) => {
        this.campaigns = res.data;
        this.filteredCampaigns = this.campaigns;
        this.campaignsSize = this.filteredCampaigns.length;
        console.log('KAMPANJAT' + JSON.stringify(this.campaigns));
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
    this.campaignsSize = this.filteredCampaigns.length;
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
    this.campaignsSize = this.filteredCampaigns.length;
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
    this.campaignsSize = this.filteredCampaigns.length;
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
    this.campaignsSize = this.filteredCampaigns.length;
  }

  // DELETE BY ID

  deleteCampaign(campaignId: string) {
    console.log('campaign id ' + campaignId);

    this.campaignService.deleteCampaignService(campaignId).subscribe({
      next: (res: any) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleStatus(campaignId: string) {
    const clickedCampaign = this.campaigns.find(
      (campaign) => campaign._id === campaignId
    );

    console.log('löydetty kampanja ' + JSON.stringify(clickedCampaign));

    if (clickedCampaign) {
      // Käännä status
      clickedCampaign.adstatus = clickedCampaign.adstatus === 'Y' ? 'N' : 'Y';

      this.campaignService.updateCampaign(clickedCampaign).subscribe({
        next: (updatedCampaign) => {
          console.log('UPDATED' + updatedCampaign);
        },
        error: (error) => {
          console.log('failed to update', error);
        },
      });
    }
  }
}
