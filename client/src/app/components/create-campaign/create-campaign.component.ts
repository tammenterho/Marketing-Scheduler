import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  company: string = localStorage.getItem('company') || '';

  inputCompany!: string;
  inputName!: string;
  inputAdTitle!: string;
  inputAdText!: string;
  inputAdTarget!: string;
  inputAdArea!: string;
  inputBudget!: number;
  inputStart!: Date;
  inputEnd!: Date;
  inputMedia!: string;
  inputUrl!: string;
  inputOther!: string;
  inputCta!: string;
  inputGender!: string;

  ngOnInit(): void {}

  addCampaign() {
    console.log('add klikattu');

    const newCampaign = {
      creator:
        localStorage.getItem('firstname') +
        ' ' +
        localStorage.getItem('lastname'),
      company: this.inputCompany,
      name: this.inputName,
      owner: localStorage.getItem('user_id'),
      adtitle: this.inputAdTitle,
      adtext: this.inputAdText,
      adtarget: 'Age ' + this.inputAdTarget + ', ' + this.inputGender,
      adarea: this.inputAdArea,
      adbudget: this.inputBudget,
      adstart: this.inputStart,
      adend: this.inputEnd,
      mediainfo: this.inputMedia,
      adurl: this.inputUrl,
      adCta: this.inputCta,
      adother: this.inputOther,
      adstatus: 'N',
    };

    console.log('uusi kampanja' + JSON.stringify(newCampaign));
  }
}
