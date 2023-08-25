import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextYearObjectivesComponent } from './next-year-objectives.component';

describe('NextYearObjectivesComponent', () => {
  let component: NextYearObjectivesComponent;
  let fixture: ComponentFixture<NextYearObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextYearObjectivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextYearObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
