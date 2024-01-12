import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/Campaign';
import { FormsModule } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  styles: [
    `
      :host ::ng-deep .p-panel-header {
        background-color: #c6953f;
        border-color: #c6953f;
        color: #ffffff;
        font-family: 'Barlow', sans-serif;
      }

      :host ::ng-deep .p-panel-content {
        border-color: #c6953f;
        font-family: 'Barlow', sans-serif;
      }
    `,
  ],
})
export class DialogComponent implements OnInit {
  campaignService = inject(CampaignService); // kun injektoi niin ei tarvitse contstructoria
  @Input() campaignData!: Campaign;
  edit: boolean = false;
  editedData: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: Campaign) {
    this.campaignData = data;
  }

  ngOnInit(): void {}

  toggleEdit() {
    console.log('data ', this.campaignData);
    this.edit = true;
  }

  cancelChanges() {
    this.edit = false;
  }

  saveChanges() {
    // tarkistetaan onko kenttä tyhjä
    this.editedData.company =
      this.editedData.company || this.campaignData.company;

    this.editedData.name = this.editedData.name || this.campaignData.name;

    this.editedData.adbudget =
      this.editedData.adbudget || this.campaignData.adbudget;

    this.editedData.adstart =
      this.editedData.adstart || this.campaignData.adstart;

    this.editedData.adend = this.editedData.adend || this.campaignData.adend;

    this.editedData.adtarget =
      this.editedData.adtarget || this.campaignData.adtarget;

    this.editedData.adarea = this.editedData.adarea || this.campaignData.adarea;

    this.editedData.adtitle =
      this.editedData.adtitle || this.campaignData.adtitle;

    this.editedData.adtext = this.editedData.adtext || this.campaignData.adtext;

    this.editedData.mediainfo =
      this.editedData.mediainfo || this.campaignData.mediainfo;

    this.editedData.adurl = this.editedData.adurl || this.campaignData.adurl;

    this.editedData.adcta = this.editedData.adcta || this.campaignData.adcta;

    this.editedData._id = this.campaignData._id;

    console.log('Päivitetty data: ', this.editedData);

    this.edit = false;
    this.updateCampaign(this.editedData);

    // tässä kohtaa haluaisin lähettää koko editedDatan campaigns komponentille ja kutsua siellä updatemetodia. Campaigns komponentti on samalla tasaolla.
  }

  updateCampaign(editedData: any) {
    console.log('nyt updatessa ', editedData);

    // Käännä status

    this.campaignService.updateCampaign(editedData).subscribe({
      next: (updatedCampaign) => {
        console.log('UPDATED' + updatedCampaign);
      },
      error: (error) => {
        console.log('failed to update', error);
      },
    });
  }
}
