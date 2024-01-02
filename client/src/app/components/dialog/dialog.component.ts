import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/Campaign';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
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
export class DialogComponent {
  @Input() campaignData!: Campaign;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Campaign) {
    this.campaignData = data;
  }
}
