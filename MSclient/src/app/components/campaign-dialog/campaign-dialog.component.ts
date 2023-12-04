import { Component, Input, Inject } from '@angular/core';
import { Campaign } from 'src/app/Campaign';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-campaign-dialog',
  templateUrl: './campaign-dialog.component.html',
  styleUrls: ['./campaign-dialog.component.css'],
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
export class CampaignDialogComponent {
  campaigns: Campaign[] = [];
  @Input() campaignData!: Campaign;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Campaign) {
    this.campaignData = data;
  }
}
