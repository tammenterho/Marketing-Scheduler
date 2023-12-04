import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/Campaign';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl = 'http://localhost:8080/campaigns';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getCampaigns(): Observable<Campaign[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.getAuthToken(),
    });

    console.log('SENDING Auth Token:', this.auth.getAuthToken());

    return this.http.get<Campaign[]>(this.apiUrl, { headers: headers });
  }

  addCampaign(campaign: Campaign): Observable<Campaign> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.getAuthToken(),
    });

    //console.log('adding');
    console.log('kampanja!! ' + JSON.stringify(campaign));

    return this.http.post<Campaign>(this.apiUrl, campaign, {
      headers: headers,
    });
  }

  updateCampaign(campaign: Campaign): Observable<Campaign> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.getAuthToken(),
    });

    const updateUrl = `${this.apiUrl}/${campaign.id}`;

    return this.http
      .put<Campaign>(updateUrl, campaign, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          // Tarkista vastauksen tila
          if (response.status === 200) {
            return campaign; // Päivitys onnistui, palauta päivitetty kampanja
          } else {
            throw new Error('Unexpected response status: ' + response.status);
          }
        }),
        catchError((error) => {
          //console.error('Failed to update campaign:', error);
          throw error; // Heitä virhe eteenpäin
        })
      );
  }

  deleteCampaignById(campaign: Campaign): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.getAuthToken(),
    });

    const deleteUrl = `${this.apiUrl}/${campaign.id}`;
    // console.log('deleting');

    return this.http
      .delete(deleteUrl, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          console.log('tämä on responsestatus' + response.status);
          if (response.status === 200 || response.status === 204) {
            return 'deleted';
          } else {
            throw new Error('Unexpected response status: ' + response.status);
          }
        })
      );
  }
}
