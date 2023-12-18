import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCampaignComponent } from './create-campaign.component';

describe('CreateCampaignComponent', () => {
  let component: CreateCampaignComponent;
  let fixture: ComponentFixture<CreateCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateCampaignComponent],
    });
    fixture = TestBed.createComponent(CreateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
