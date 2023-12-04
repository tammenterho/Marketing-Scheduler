import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDialogComponent } from './campaign-dialog.component';

describe('CampaignDialogComponent', () => {
  let component: CampaignDialogComponent;
  let fixture: ComponentFixture<CampaignDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignDialogComponent]
    });
    fixture = TestBed.createComponent(CampaignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
