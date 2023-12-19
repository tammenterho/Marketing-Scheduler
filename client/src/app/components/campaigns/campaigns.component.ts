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
  campaignService = inject(CampaignService);
  campaigns: any[] = [];

  ngOnInit(): void {
    this.campaignService
      .getCampaignsService(localStorage.getItem('user_id'))
      .subscribe({
        next: (res: any) => {
          this.campaigns = res.data;
          console.log('campaigns: ' + this.campaigns);
          console.log('Response from server:', JSON.stringify(res, null, 2));
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
