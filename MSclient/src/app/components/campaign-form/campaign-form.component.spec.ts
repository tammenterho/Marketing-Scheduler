import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFormComponent } from './campaign-form.component';

describe('CampaignFormComponent', () => {
  let component: CampaignFormComponent;
  let fixture: ComponentFixture<CampaignFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignFormComponent]
    });
    fixture = TestBed.createComponent(CampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
