import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAnnualAppraisalComponent } from './self-annual-appraisal.component';

describe('SelfAnnualAppraisalComponent', () => {
  let component: SelfAnnualAppraisalComponent;
  let fixture: ComponentFixture<SelfAnnualAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfAnnualAppraisalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfAnnualAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
