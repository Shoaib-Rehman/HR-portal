import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchAppriasalComponent } from './launch-appriasal.component';

describe('LaunchAppriasalComponent', () => {
  let component: LaunchAppriasalComponent;
  let fixture: ComponentFixture<LaunchAppriasalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchAppriasalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchAppriasalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
