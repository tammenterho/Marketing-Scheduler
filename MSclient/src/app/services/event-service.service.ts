import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Campaign } from '../Campaign';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private addCampaignEvent = new BehaviorSubject<Campaign | null>(null);
  // BehaviorSubject säilyttää ja lähettää tapahtumia

  addCampaign$ = this.addCampaignEvent.asObservable(); // komponentin tilaaja, joka kuuntelee tapahtumia
  // $  tuottaa tapahtumia tai virtaa asynkronisesti. Liittyy observableihin
  constructor() {
    console.log('EventServiceService created');
  }

  // kun kutsutaan, lähettää tyhjän objektin eteenpäin joka ilmoittaa kaikille addCampaign$ tilaajille
  // että tapahtuma on tapahtunut
  triggerAddCampaignEvent(campaign: Campaign) {
    console.log('Triggering addCampaignEvent' + campaign);
    this.addCampaignEvent.next(campaign);
    // next() on metodi, jota kutsutaan RxJS:n BehaviorSubject-luokan instanssilla
    // (tai muilla RxJS-observaabeleilla), kun halutaan lähettää uusi arvo
    // tai tapahtuma observaabilin tilaajille. Tämä metodi käynnistää observaabilin
    // ja lähettää sille uuden arvon, joka on saatavilla kaikille tilaajille.
  }
}
