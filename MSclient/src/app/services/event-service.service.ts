import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private addCampaignEvent = new BehaviorSubject<{}>({});
  // BehaviorSubject säilyttää ja lähettää tapahtumia

  addCampaign$ = this.addCampaignEvent.asObservable(); // komponentin tilaaja, joka kuuntelee tapahtumia
  // $  tuottaa tapahtumia tai virtaa asynkronisesti. Liittyy observableihin
  constructor() {}
  // kun kutsutaan, lähettää tyhjän objektin eteenpäin joka ilmoittaa kaikille addCampaign$ tilaajille
  // että tapahtuma on tapahtunut
  triggerAddCampaignEvent() {
    this.addCampaignEvent.next({});
    // next() on metodi, jota kutsutaan RxJS:n BehaviorSubject-luokan instanssilla
    // (tai muilla RxJS-observaabeleilla), kun halutaan lähettää uusi arvo
    // tai tapahtuma observaabilin tilaajille. Tämä metodi käynnistää observaabilin
    // ja lähettää sille uuden arvon, joka on saatavilla kaikille tilaajille.
  }
}
