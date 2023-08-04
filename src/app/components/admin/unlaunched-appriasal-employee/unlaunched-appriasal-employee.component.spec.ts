import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlaunchedAppriasalEmployeeComponent } from './unlaunched-appriasal-employee.component';

describe('UnlaunchedAppriasalEmployeeComponent', () => {
  let component: UnlaunchedAppriasalEmployeeComponent;
  let fixture: ComponentFixture<UnlaunchedAppriasalEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlaunchedAppriasalEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlaunchedAppriasalEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
