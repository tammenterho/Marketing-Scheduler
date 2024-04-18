import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from 'src/app/services/campaign.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SureDialogComponent } from '../sure-dialog/sure-dialog.component';
import { Campaign } from 'src/app/Campaign';
import { CampaignListService } from 'src/app/services/campaign-list.service';
import { ToastrService } from 'ngx-toastr';
import { Input } from '@angular/core';

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
  displayLimit = 7; // Start with 7 items

  currentDate = Date.now();
  pastCampaigns: any[] = [];
  currentCampaigns: any[] = [];
  upcomingCampaigns: any[] = [];
  filteredCampaigns: any[] = [];
  campaignData!: any;
  unDoneBtnColor: string = 'bg-gray-500';
  allBtnColor: string = 'bg-green-600';
  pastBtnColor: string = 'bg-gray-500';
  currentBtnColor: string = 'bg-gray-500';
  upcomingBtnColor: string = 'bg-gray-500';
  campaignsSize: number = 0;
  isAdmin: boolean = false;
  emptyCampaigns: string = '';
  campaignName!: string;

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
    if (
      localStorage.getItem('firstname') === 'Jaska' ||
      localStorage.getItem('firstname') === 'Herrala' ||
      localStorage.getItem('user_id') === '65818ac7e6c0dc662572fea4'
    ) {
      this.filteredCampaigns = this.campaigns;
    } else {
      this.filteredCampaigns = this.campaigns.filter(
        (campaign) => campaign.owner !== '65818ac7e6c0dc662572fea4'
      );

      this.filteredCampaigns = this.filteredCampaigns.sort((a, b) => {
        const today = new Date();
        const aDiff = Math.abs(new Date(a.adend).getTime() - today.getTime());
        const bDiff = Math.abs(new Date(b.adend).getTime() - today.getTime());

        return aDiff - bDiff; // Ascending order
      });

      this.campaignsSize = this.filteredCampaigns.length;
    }
  }

  // SHOW MORE AND lESS WHEN OVER 7 CAMPAIGNS
  showMoreCampaigns() {
    this.displayLimit += 7;
    //console.log('Limit' + this.displayLimit);
  }
  showLessCampaigns() {
    this.displayLimit -= 7;
  }

  // ALL CAMPAIGNS BUTTON

  getAllButton() {
    this.displayLimit = 7;
    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-green-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-gray-500';
    this.unDoneBtnColor = 'bg-gray-500';

    if (
      localStorage.getItem('firstname') === 'Jaska' ||
      localStorage.getItem('firstname') === 'Herrala' ||
      localStorage.getItem('user_id') === '65818ac7e6c0dc662572fea4'
    ) {
      this.filteredCampaigns = this.campaigns;
    } else {
      this.filteredCampaigns = this.campaigns.filter(
        (campaign) => campaign.owner !== '65818ac7e6c0dc662572fea4'
      );
    }

    this.filteredCampaigns = this.filteredCampaigns.sort((a, b) => {
      const today = new Date();
      const aDiff = Math.abs(new Date(a.adend).getTime() - today.getTime());
      const bDiff = Math.abs(new Date(b.adend).getTime() - today.getTime());

      return aDiff - bDiff; // Ascending order
    });

    this.campaignsSize = this.filteredCampaigns.length;
    this.emptyCampaigns = 'No campaigns';
  }

  getUndoneCampaigns() {
    this.unDoneBtnColor = 'bg-green-600';
    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-gray-500';

    this.filteredCampaigns = this.campaigns.filter(
      (campaign) => campaign.adstatus === 'N'
    );

    this.campaignsSize = this.filteredCampaigns.length;

  }

  // FILTER PAST

  getPastCampaigns() {
    this.displayLimit = 7;
    // console.log('past clicked');
    this.pastBtnColor = 'bg-green-600';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-gray-500';
    this.unDoneBtnColor = 'bg-gray-500';

    this.pastCampaigns = this.campaigns.filter(
      (campaign) =>
        new Date(campaign.adend).getTime() < this.currentDate ||
        new Date(campaign.postDate).getTime() < this.currentDate
    );

    // console.log(this.pastCampaigns);
    if (
      localStorage.getItem('firstname') === 'Jaska' ||
      localStorage.getItem('firstname') === 'Herrala' ||
      localStorage.getItem('user_id') === '65818ac7e6c0dc662572fea4'
    ) {
      this.filteredCampaigns = this.pastCampaigns;
    } else {
      this.filteredCampaigns = this.pastCampaigns.filter(
        (campaign) => campaign.owner !== '65818ac7e6c0dc662572fea4'
      );

      // sorting by date
      this.filteredCampaigns = this.filteredCampaigns.sort((a, b) => {
        const today = new Date();
        const aDiff = Math.abs(new Date(a.adend).getTime() - today.getTime());
        const bDiff = Math.abs(new Date(b.adend).getTime() - today.getTime());

        return aDiff - bDiff; // Ascending order
      });

      this.campaignsSize = this.filteredCampaigns.length;
      this.emptyCampaigns = 'There have not been any campaigns';
    }
  }

  // FILTER CURRENT

  getCurrentCampaigns() {
    this.displayLimit = 7;
    // console.log('current clicked');

    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-green-600';
    this.upcomingBtnColor = 'bg-gray-500';
    this.unDoneBtnColor = 'bg-gray-500';

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

    if (
      localStorage.getItem('firstname') === 'Jaska' ||
      localStorage.getItem('firstname') === 'Herrala' ||
      localStorage.getItem('user_id') === '65818ac7e6c0dc662572fea4'
    ) {
      this.filteredCampaigns = this.currentCampaigns;
    } else {
      // console.log(this.currentCampaigns);
      this.filteredCampaigns = this.currentCampaigns.filter(
        (campaign) => campaign.owner !== '65818ac7e6c0dc662572fea4'
      );

      // sorting by date
      this.filteredCampaigns = this.filteredCampaigns.sort((a, b) => {
        const today = new Date();
        const aDiff = Math.abs(new Date(a.adstart).getTime() - today.getTime());
        const bDiff = Math.abs(new Date(b.adstart).getTime() - today.getTime());

        return aDiff - bDiff; // Ascending order
      });

      this.campaignsSize = this.filteredCampaigns.length;
      this.emptyCampaigns = 'Theres no campaigns running at the moment';
    }
  }

  // FILTER UPCOMING

  getUpcomingCampaigns() {
    this.displayLimit = 7;
    // console.log('upcoming clicked');

    this.pastBtnColor = 'bg-gray-500';
    this.allBtnColor = 'bg-gray-500';
    this.currentBtnColor = 'bg-gray-500';
    this.upcomingBtnColor = 'bg-green-600';
    this.unDoneBtnColor = 'bg-gray-500';

    this.upcomingCampaigns = this.campaigns.filter((campaign) => {
      const startDate = new Date(campaign.adstart).getTime();
      const postingDate = new Date(campaign.postDate).getTime();

      const now = this.currentDate;

      // Tarkista, onko alkamisaika mennyt ja loppumisaika on tulossa
      return now < startDate || now < postingDate;
    });

    if (
      localStorage.getItem('firstname') === 'Jaska' ||
      localStorage.getItem('firstname') === 'Herrala' ||
      localStorage.getItem('user_id') === '65818ac7e6c0dc662572fea4'
    ) {
      this.filteredCampaigns = this.upcomingCampaigns;
    } else {
      // console.log(this.currentCampaigns);
      this.filteredCampaigns = this.upcomingCampaigns.filter(
        (campaign) => campaign.owner !== '65818ac7e6c0dc662572fea4'
      );

      // sorting by date
      this.filteredCampaigns = this.filteredCampaigns.sort((a, b) => {
        const today = new Date();
        const aDiff = Math.abs(new Date(a.adstart).getTime() - today.getTime());
        const bDiff = Math.abs(new Date(b.adstart).getTime() - today.getTime());

        return aDiff - bDiff; // Ascending order
      });

      this.campaignsSize = this.filteredCampaigns.length;
      this.emptyCampaigns = 'Theres no upcoming campaigns';
    }
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
    const foundCampaign = this.campaigns.find(
      (campaign) => campaign._id === campaignId
    );
    if (foundCampaign) {
      this.campaignName = foundCampaign.name;
      // console.log('CAMPAIGN NAME ' + this.campaignName);
    } else {
      console.log('not found');
    }
    // viittaus dialogiin = dialogRef
    // antaa pääsyn instanssiin = componentInstance
    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.componentInstance.campaignName = foundCampaign.name;

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
