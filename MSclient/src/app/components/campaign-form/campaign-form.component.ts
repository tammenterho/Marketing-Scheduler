import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Campaign } from 'src/app/Campaign';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

interface Gender {
  name: string;
}
interface CTA {
  name: string;
}

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
})
export class CampaignFormComponent {
  @Output() onAddCampaign: EventEmitter<Campaign> = new EventEmitter();

  targetGender: string = 'all';
  genders: Gender[] | undefined;

  targetCTA: string = 'Contact us!';
  ctas: CTA[] | undefined;

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

  inputContact!: string;

  showAddTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, public auth: AuthService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  } // seurataan onTogglea ja jos on true tai false niin add task asetetaan siihen

  ngOnInit() {
    this.genders = [
      { name: 'All' },
      { name: 'Female' },
      { name: 'Male' },
      { name: 'Unknown' },
    ];

    this.ctas = [
      { name: 'Book Now' },
      { name: 'Contact Us' },
      { name: 'Donate Now' },
      { name: 'Download' },
      { name: 'Learn More' },
      { name: 'Send Message' },
      { name: 'Apply Now' },
      { name: 'Shop Now' },
      { name: 'Watch More' },
    ];
  }

  resetRadioButtons() {
    this.inputContact = '';
  }

  onSubmit() {
    if (!this.inputName) {
      alert('Add name');
      return;
    }
    console.log('tässä on inputcompany' + this.inputCompany);

    const user = this.auth.getLogin(); //  getLogin() returns user information
    console.log('tässä user id ', user);

    if (!user || !user.id) {
      console.error('User ID not available');
      return;
    }

    let idNumber = Math.floor(Math.random() * 100);
    let creator =
      this.auth.getLogin().firstName + ' ' + this.auth.getLogin().lastName;

    let tGender = JSON.stringify(this.targetGender);
    let adCta = JSON.stringify(this.targetCTA);

    const newCampaign = {
      creator: creator,
      id: idNumber,
      company: this.inputCompany,
      owner: user.id,
      name: this.inputName,
      adtitle: this.inputAdTitle,
      adtext: this.inputAdText,
      adtarget:
        'Age ' +
        this.inputAdTarget +
        ', ' +
        (tGender ? ' ' + JSON.parse(tGender).name : ''),
      adarea: this.inputAdArea,
      adbudget: this.inputBudget,
      adstart: this.inputStart,
      adend: this.inputEnd,
      mediainfo: this.inputMedia,
      adurl: this.inputUrl + ', ' + (adCta ? ' ' + JSON.parse(adCta).name : ''),
      adother: this.inputOther,
      adstatus: 'N',
      adcontact: this.inputContact,
    };

    this.onAddCampaign.emit(newCampaign);

    (this.inputCompany = ''), (this.inputName = '');
    this.inputAdTitle = '';
    this.inputAdText = '';
    this.inputAdTarget = '';
    this.inputAdArea = '';
    this.inputBudget = 0;
    this.inputMedia = '';
    this.inputUrl = '';
    this.inputOther = '';
    this.inputContact = '';
  }
}
