import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualApprsaialComponent } from './annual-apprsaial.component';

describe('AnnualApprsaialComponent', () => {
  let component: AnnualApprsaialComponent;
  let fixture: ComponentFixture<AnnualApprsaialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualApprsaialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualApprsaialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
