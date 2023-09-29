import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprisalResultsComponent } from './apprisal-results.component';

describe('ApprisalResultsComponent', () => {
  let component: ApprisalResultsComponent;
  let fixture: ComponentFixture<ApprisalResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprisalResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprisalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
