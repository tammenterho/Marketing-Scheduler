import { Injectable, inject } from '@angular/core';
import { CampaignService } from './campaign.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignListService {
  private campaignsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public campaigns$: Observable<any[]> = this.campaignsSubject.asObservable();

  campaignService = inject(CampaignService);
  campaigns: any = [];

  constructor() {
    this.getAllCampaignsFromService();
  }

  getAllCampaignsFromService(): void {
    const userId = localStorage.getItem('user_id') || '';
    console.log('Päivitetään kampanjat');

    this.campaignService.getCampaignsService(userId).subscribe({
      next: (res: any) => {
        this.campaignsSubject.next(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteCampaign(campaignId: string) {
    // console.log('Campaign id ' + campaignId);

    this.campaignService.deleteCampaignService(campaignId).subscribe({
      next: (res: any) => {
        // Onnistuneesti poistettu kampanja
        this.campaigns = (this.campaigns as any[]).filter(
          (campaign) => campaign.id !== campaignId
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
