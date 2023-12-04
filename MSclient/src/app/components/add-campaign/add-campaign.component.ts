import { Component } from '@angular/core';
import { Campaign } from 'src/app/Campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css'],
})
export class AddCampaignComponent {
  campaigns: Campaign[] = []; // tämä tulee suoraan servicestä
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(
    private campaignService: CampaignService,
    private uiService: UiService,
    private eventService: EventServiceService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  } // seurataan onTogglea ja jos on true tai false niin add task asetetaan siihen

  toggleAddTask() {
    this.uiService.toggleAddTask();
  } // ei tarvi outputtia koska on serviceluokka josta saa kaikki metodit

  addCampaign(campaign: Campaign) {
    this.campaignService
      .addCampaign(campaign)
      .subscribe((campaign) => this.campaigns.push(campaign));

    this.eventService.triggerAddCampaignEvent();
  }
}
