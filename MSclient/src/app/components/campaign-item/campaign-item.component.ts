import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/Campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignDialogComponent } from '../campaign-dialog/campaign-dialog.component';
import { EventServiceService } from 'src/app/services/event-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css'],
})
export class CampaignItemComponent implements OnInit {
  campaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];
  campaignTime: string = 'current';
  pastColor: boolean = false;
  currentColor: boolean = true;
  upcomingColor: boolean = false;
  size: number = 0;
  showWholeCampaign: boolean = false;
  campaignData!: Campaign;
  user: any;
  noCampaigns: boolean = false;
  emptyCampaigns: string = 'moi';

  constructor(
    private campaignService: CampaignService,
    public dialog: MatDialog,
    private eventService: EventServiceService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllCampaigns();
    this.subscribeToAddCampaignEvent();
  }

  private subscribeToAddCampaignEvent() {
    this.eventService.addCampaign$.subscribe(() => {
      this.getAllCampaigns();
    }); // servicet pitää aina laittaa konstruktoriin
  }

  getAllCampaigns() {
    this.campaignService.getCampaigns().subscribe((campaigns) => {
      /*this.user = this.auth.getLogin(); // Assuming getLogin() returns user information
      if (this.user.login === 'admin') {
        this.campaigns = campaigns;
      } else {
        this.campaigns = campaigns.filter(
          (campaign) =>
            campaign.owner === this.user.id || this.user.login === 'admin'
        );
      }
*/
      this.campaigns = campaigns;
      this.filteredCampaigns = [...this.campaigns]; // Kopio alkuperäisestä taulukosta
      this.filterCampaigns(); // filteröidään currentin mukaan heti. sbscribe asynkroninen kuten then
      this.size = this.filteredCampaigns.length; // asetaan listan koko heti
      console.log('haetaan kampanjat itsem komponentissa' + this.campaigns);

      if (this.filteredCampaigns.length === 0) {
        this.noCampaigns = true;
        this.emptyCampaigns = 'There is no campaigns running at the moment';
      } else {
        this.noCampaigns = false;
      }
    });
  }

  onPast() {
    this.campaignTime = 'past';
    this.filterCampaigns();
    this.upcomingColor = false;
    this.currentColor = false;
    this.pastColor = true;
    this.size = this.filteredCampaigns.length;
    this.emptyCampaigns = 'There have not been any campaigns';
  }
  onCurrent() {
    console.log('onCurrent called');

    this.campaignTime = 'current';
    this.filterCampaigns();
    this.upcomingColor = false;
    this.currentColor = true;
    this.pastColor = false;
    this.size = this.filteredCampaigns.length;
    this.emptyCampaigns = 'Theres no campaigns running at the moment';
  }
  onUpcoming() {
    this.campaignTime = 'upcoming';
    this.filterCampaigns();
    this.upcomingColor = true;
    this.currentColor = false;
    this.pastColor = false;
    this.size = this.filteredCampaigns.length;
    this.emptyCampaigns = 'Theres no upcoming campaigns';
  }

  // filteröi listat sen mukaan onko startdate mennyt vai tulossa vai onko nyt start ja endin välissä
  // sorttaa listat
  private filterCampaigns() {
    const currentDate = new Date();
    if (this.campaignTime === 'past') {
      this.filteredCampaigns = this.campaigns.filter(
        (campaign) => new Date(campaign.adend) < currentDate
      );
      this.filteredCampaigns.sort((a, b) => {
        const endDateA = new Date(a.adend).getTime();
        const endDateB = new Date(b.adend).getTime();
        return endDateB - endDateA;
        // myöhäisin enddate on ylimpänä listassa
      });
      if (this.filteredCampaigns.length === 0) {
        this.noCampaigns = true;
      } else {
        this.noCampaigns = false;
      }
    } else if (this.campaignTime === 'current') {
      this.filteredCampaigns = this.campaigns.filter(
        (campaign) =>
          new Date(campaign.adstart) <= currentDate &&
          new Date(campaign.adend) >= currentDate
      );
      this.filteredCampaigns.sort((a, b) => {
        const startDateA = new Date(a.adstart).getTime();
        const startDateB = new Date(b.adstart).getTime();
        return startDateA - startDateB;
        // aikaisin startdate on ylimpänä listassa
      });
      if (this.filteredCampaigns.length === 0) {
        this.noCampaigns = true;
      } else {
        this.noCampaigns = false;
      }
    } else if (this.campaignTime === 'upcoming') {
      this.filteredCampaigns = this.campaigns.filter(
        (campaign) => new Date(campaign.adstart) > currentDate
      );
      this.filteredCampaigns.sort((a, b) => {
        const startDateA = new Date(a.adstart).getTime();
        const startDateB = new Date(b.adstart).getTime();
        return startDateA - startDateB;
        // aikaisin startdate on ylimpänä listassa
      });
      if (this.filteredCampaigns.length === 0) {
        this.noCampaigns = true;
      } else {
        this.noCampaigns = false;
      }
    }
  }

  openDialog(clickedCampaignId: number): void {
    // Hae kampanja id:n perusteella
    const clickedCampaign = this.campaigns.find(
      (campaign) => campaign.id === clickedCampaignId
    );

    if (clickedCampaign) {
      const dialogRef = this.dialog.open(CampaignDialogComponent, {
        width: '700px',
        data: clickedCampaign,
      });
      this.campaignData = clickedCampaign;
      console.log(this.campaignData);

      dialogRef.afterClosed().subscribe((result) => {
        //console.log('Dialog suljettu', result);
      });
    }
  }

  toggleStatus(clickedCampaignId: number): void {
    const clickedCampaign = this.campaigns.find(
      (campaign) => campaign.id === clickedCampaignId
    );

    if (clickedCampaign) {
      // Käännä status
      clickedCampaign.adstatus = clickedCampaign.adstatus === 'Y' ? 'N' : 'Y';

      //console.log('Clicked status: ' + JSON.stringify(clickedCampaign));

      // Päivitä kampanja palvelimelle
      this.campaignService.updateCampaign(clickedCampaign).subscribe({
        next: (updatedCampaign) => {
          //console.log('Campaign updated successfully:', updatedCampaign);
          // Voit lisätä muita toimenpiteitä päivityksen onnistuessa
        },
        error: (error) => {
          console.error('Failed to update campaign:', error);
          // Käsittele virhe täällä tarvittaessa
        },
        complete: () => {
          // Suorita toimenpiteitä, jos tarpeen, kun observable on valmis
        },
      });
    }
  }

  deleteCampaign(clickedCampaignId: number): void {
    const clickedCampaign = this.campaigns.find(
      (campaign) => campaign.id === clickedCampaignId
    );

    if (clickedCampaign) {
      this.campaignService.deleteCampaignById(clickedCampaign).subscribe({
        next: () => {},
        error: (error) => {
          console.error('failed to delete', error);
        },
        complete: () => {
          const index = this.campaigns.findIndex(
            (campaign) => campaign.id === clickedCampaignId
          );
          if (index !== -1) {
            this.campaigns.splice(index, 1);
            // Päivitä myös filteredCampaigns
            this.filterCampaigns();
            this.size = this.filteredCampaigns.length;
          }
        },
      });
    }
  }
}
