import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  campaignService = inject(CampaignService); // kun injektoi niin ei tarvitse contstructoria

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
      owner: localStorage.getItem('user_id'),
      name: this.inputName,
      adtitle: this.inputAdTitle,
      adtext: this.inputAdText,
      adtarget: 'Age ' + this.inputAdTarget + ', ' + this.inputGender,
      adarea: this.inputAdArea,
      adbudget: this.inputBudget,
      adstart: this.inputStart,
      adend: this.inputEnd,
      mediainfo: this.inputMedia,
      adurl: this.inputUrl,
      adcta: this.inputCta,
      adother: this.inputOther,
      adstatus: 'N',
      adcontact:
        localStorage.getItem('firstname') +
        ' ' +
        localStorage.getItem('lastname'),
    };

    console.log('uusi kampanja' + JSON.stringify(newCampaign));

    this.campaignService.postCampaignService(newCampaign).subscribe({
      next: (res: any) => {
        res.data;
        console.log('lähetetään kampanja');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
