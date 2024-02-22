import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  http = inject(HttpClient);

  getCampaignsService(userId: string) {
    // console.log('loginobj:  ' + userId);
    return this.http.get<any>(
      `${apiUrls.campaignServiceApi}campaigns/${userId}`
    );
  }

  postCampaignService(newCampaign: any) {
    console.log('newcampaign servicessä: ' + JSON.stringify(newCampaign));

    return this.http.post<any>(
      `${apiUrls.campaignServiceApi}campaigns`,
      newCampaign
    );
  }

  // DELETE CAMPAIGN BY ID

  deleteCampaignService(campaignId: string) {
    // console.log('DELETING' + campaignId);

    return this.http.delete<any>(
      `${apiUrls.campaignServiceApi}campaigns/${campaignId}`
    );
  }

  // UPDATE CAMPAIGN

  updateCampaign(clickedCampaign: any) {
    // console.log('UPDATING ' + JSON.stringify(clickedCampaign));
    const campaignId = clickedCampaign._id;

    return this.http.put<any>(
      `${apiUrls.campaignServiceApi}campaigns/${campaignId}`,
      clickedCampaign
    );
  }
}
