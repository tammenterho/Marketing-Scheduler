import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  http = inject(HttpClient);

  getCampaignsService(loginObj: any) {
    console.log('loginobj:  ' + loginObj);
    return this.http.get<any>(
      `${apiUrls.campaignServiceApi}campaigns`,
      loginObj
    );
  }
}
