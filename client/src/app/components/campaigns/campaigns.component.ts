import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from 'src/app/services/campaign.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SureDialogComponent } from '../sure-dialog/sure-dialog.component';
import { Campaign } from 'src/app/Campaign';
import { CampaignListService } from 'src/app/services/campaign-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
})
export class CampaignsComponent implements OnInit {
  campaignService = inject(CampaignService); // kun injektoi niin ei tarvitse contstructoria
  campaigns: any[] = [];

  currentDate = Date.now();
  pastCampaigns: any[] = [];
  currentCampaigns: any[] = [];
  upcomingCampaigns: any[] = [];
  filteredCampaigns: any[] = [];
  campaignData!: any;
  allBtnColor: string = 'bg-green-600';
  pastBtnColor: string = 'bg-gray-500';
  currentBtnColor: string = 'bg-gray-500';
  upcomingBtnColor: string = 'bg-gray-500';
  campaignsSize: number = 0;
  isAdmin: boolean = false;
  emptyCampaigns: string = '';

  // MANAGEMENT OF CAMPAIGNS
  campaignList = inject(CampaignListService);

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    this.isAdmin = storedIsAdmin ? JSON.parse(storedIsAdmin) : false;

    this.campaignList.campaigns$.subscribe((campaigns) => {
      this.campaigns = campaigns;
      this.getAllCampaigns();
    });
  }

  // SEARCH INPUT

  filterResults(text: string) {
    if (!text) {
      this.filteredCampaigns = this.campaigns;
      return;
    }

    this.filteredCampaigns = this.campaigns.filter((campaign) =>
      campaign?.name.toLowerCase().includes(text.toLowerCase())
    );
    this.campaignsSize = this.filteredCampaigns.length;
  }

  // GET ALL

  getAllCampaigns() {
    //console.log( 'nämä on taas kampanjat komponenttissa' + this.campaignList.campaigns );

    // CAMPAIGNS ARE GET IN CAMPAIGNLIST COMPONENT

    // this.campaigns = this.campaignList.campaigns;
    this.filteredCampaigns = this.campaigns;
    this.campaignsSize = this.filteredCampaigns.length;
  }

  // ALL CAMPAIGNS BUTTON

  getAllButton() {
    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-green-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-gray-500';

    this.filteredCampaigns = this.campaigns;
    this.campaignsSize = this.filteredCampaigns.length;

    this.emptyCampaigns = 'No campaigns';
  }

  // FILTER PAST

  getPastCampaigns() {
    // console.log('past clicked');
    this.pastBtnColor = 'bg-green-600';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-gray-500';

    this.pastCampaigns = this.campaigns.filter(
      (campaign) =>
        new Date(campaign.adend).getTime() < this.currentDate ||
        new Date(campaign.postDate).getTime() < this.currentDate
    );

    // console.log(this.pastCampaigns);
    this.filteredCampaigns = this.pastCampaigns;
    this.campaignsSize = this.filteredCampaigns.length;
    this.emptyCampaigns = 'There have not been any campaigns';
  }

  // FILTER CURRENT

  getCurrentCampaigns() {
    // console.log('current clicked');

    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-green-600';
    this.upcomingBtnColor = 'bg-gray-500';

    this.currentCampaigns = this.campaigns.filter((campaign) => {
      const startDate = new Date(campaign.adstart).getTime();
      const endDate = new Date(campaign.adend).getTime();
      const postedDate = new Date(campaign.postDate).getTime();
      const now = this.currentDate;

      return (
        (startDate < now && now < endDate) ||
        new Date(postedDate).setHours(0, 0, 0, 0) ===
          new Date(now).setHours(0, 0, 0, 0)
      );
    });

    // console.log(this.currentCampaigns);
    this.filteredCampaigns = this.currentCampaigns;
    this.campaignsSize = this.filteredCampaigns.length;
    this.emptyCampaigns = 'Theres no campaigns running at the moment';
  }

  // FILTER UPCOMING

  getUpcomingCampaigns() {
    // console.log('upcoming clicked');

    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-green-600';

    this.upcomingCampaigns = this.campaigns.filter((campaign) => {
      const startDate = new Date(campaign.adstart).getTime();
      const postingDate = new Date(campaign.postDate).getTime();

      const now = this.currentDate;

      // Tarkista, onko alkamisaika mennyt ja loppumisaika on tulossa
      return now < startDate || now < postingDate;
    });

    // console.log(this.currentCampaigns);
    this.filteredCampaigns = this.upcomingCampaigns;
    this.campaignsSize = this.filteredCampaigns.length;
    this.emptyCampaigns = 'Theres no upcoming campaigns';
  }

  // CHANGE STATUS

  toggleStatus(campaignId: string) {
    const clickedCampaign = this.campaigns.find(
      (campaign) => campaign._id === campaignId
    );

    // console.log('löydetty kampanja ' + JSON.stringify(clickedCampaign));

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

  // OPEN CAMPAIGN DIALOG

  openDialog(clickedCampaignId: string): void {
    // Hae kampanja id:n perusteella
    const clickedCampaign = this.campaigns.find(
      (campaign) => campaign._id === clickedCampaignId
    );
    console.log('klikattu kampanja' + clickedCampaign);

    if (clickedCampaign) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '700px',
        data: clickedCampaign,
      });
      this.campaignData = clickedCampaign;
      //console.log(this.campaignData);

      dialogRef.afterClosed().subscribe((result) => {
        //console.log('Dialog suljettu', result);
      });
    }
  }

  // ARE YOU SURE DELETE and delete

  sureDialog(campaignId: string) {
    const dialogRef = this.dialog.open(SureDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);

      if (result) {
        try {
          this.campaignList.deleteCampaign(campaignId);

          // Etsi indeksi, jossa kampanjan id on
          const index = this.campaigns.findIndex(
            (campaign) => campaign._id === campaignId
          );

          // Jos indeksi löytyy, poista kampanja splice-metodilla
          if (index !== -1) {
            this.campaigns.splice(index, 1);
          }
          this.toastr.success('Deleted successfully!');
        } catch (error) {
          this.toastr.error('Could not delete campaign');
        }
      }
    });
  }
}
