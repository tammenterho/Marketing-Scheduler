import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemComponent } from './campaign-item.component';

describe('CampaignItemComponent', () => {
  let component: CampaignItemComponent;
  let fixture: ComponentFixture<CampaignItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignItemComponent]
    });
    fixture = TestBed.createComponent(CampaignItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
