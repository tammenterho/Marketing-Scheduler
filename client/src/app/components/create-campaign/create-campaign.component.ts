import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign.service';
import { NgForm } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CampaignListService } from 'src/app/services/campaign-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  campaignService = inject(CampaignService); // kun injektoi niin ei tarvitse contstructoria
  campaignList = inject(CampaignListService); // uusi
  fb = inject(FormBuilder);
  formSimple: boolean = true;
  simpleColor: string = 'bg-green-600';
  advancedColor: string = 'bg-gray-500';
  formAd: boolean = true;
  paidAdColor: string = 'bg-green-600';
  postColor: string = 'bg-gray-500';
  loading: boolean = false;
  visibleOther: boolean = false;
  postChannel: string = '';
  visibleSave: boolean = false;

  constructor(private toastr: ToastrService) {}
  @ViewChild('campaignForm') campaignForm!: NgForm; //uusi

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
  inputDatePost!: Date;
  inputMedia!: string;
  inputUrl!: string;
  inputOther!: string;
  inputCta!: string;
  inputGender!: string;
  inputPayer!: string;
  inputFacebook!: string;
  inputInstagram!: string;
  inputLinkedin!: string;
  inputChannel!: string;

  ngOnInit(): void {
    this.company = localStorage.getItem('company') || '';
    console.log('pvm nyt ' + Date.now());
  }

  validateEmptyFields() {
    if (this.inputCompany === '') {
      this.visibleSave = false;
    } else {
      this.visibleSave = true;
    }
  }

  // Jos on true niin näyttää other vapaa -inputkentän kohdassa payer
  payerCheck() {
    this.visibleOther = true;
    // console.log(this.inputPayer);
  }

  // Jos on true niin näyttää other vapaa -inputkentän kohdassa payer
  payerunCheck() {
    this.visibleOther = false;

    // console.log(this.inputPayer);
  }

  addCampaign() {
    this.loading = true;
    // console.log('add klikattu');
    this.checkPostChannel();

    const newCampaign = {
      adType: this.formAd,
      creationDate: Date.now(),
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
      postDate: this.inputDatePost,
      mediainfo: this.inputMedia,
      adurl: this.inputUrl,
      adcta: this.inputCta,
      adother: this.inputOther,
      adstatus: 'N',
      adcontact:
        localStorage.getItem('firstname') +
        ' ' +
        localStorage.getItem('lastname'),
      adpayer: this.inputPayer,
      postChannel: this.postChannel,
    };

    // console.log('uusi kampanja' + JSON.stringify(newCampaign));

    this.campaignService.postCampaignService(newCampaign).subscribe({
      next: (res: any) => {
        res.data;
        this.campaignList.campaigns.push(newCampaign);

        // console.log('lähetetään kampanja');
      },
      error: (err) => {
        //console.log(err);
        this.toastr.error('Error when adding campaign');
        this.loading = false;
      },
      complete: () => {
        this.toastr.success('Campaign added successfully!');
        this.campaignForm.resetForm();
        this.loading = false;
        this.campaignList.getAllCampaignsFromService();
      },
    });
  }

  toggleSimple() {
    this.simpleColor = 'bg-green-600';
    this.advancedColor = 'bg-gray-500';
    this.formSimple = true;
  }

  toggleAdvanced() {
    this.advancedColor = 'bg-green-600';
    this.simpleColor = 'bg-gray-500';
    this.formSimple = false;
  }

  togglePaid() {
    this.paidAdColor = 'bg-green-600';
    this.postColor = 'bg-gray-500';
    this.formAd = true;
  }

  togglePost() {
    this.postColor = 'bg-green-600';
    this.paidAdColor = 'bg-gray-500';
    this.formAd = false;
  }

  // Katsoo mitkä kentät on valittu, eli mihin postatataan
  checkPostChannel() {
    if (this.inputFacebook) {
      this.postChannel += 'Facebook';
    }
    // Tarkista, onko Instagram valittu, ja lisää se postChannel -muuttujaan
    if (this.inputInstagram) {
      // Lisätään pilkku, jos aiemmin on jo lisätty kanava
      if (this.postChannel) {
        this.postChannel += ', ';
      }
      this.postChannel += 'Instagram';
    }
    // Tarkista, onko Linkedin valittu, ja lisää se postChannel -muuttujaan
    if (this.inputLinkedin) {
      // Lisätään pilkku, jos aiemmin on jo lisätty kanava
      if (this.postChannel) {
        this.postChannel += ', ';
      }
      this.postChannel += 'Linkedin';
    }
    // Lisää muut kanavat, jos ne on syötetty tekstikenttään
    if (this.inputChannel) {
      // Lisätään pilkku, jos aiemmin on jo lisätty kanava
      if (this.postChannel) {
        this.postChannel += ', ';
      }
      this.postChannel += this.inputChannel;
    }
  }
}
