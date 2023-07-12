import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishboardComponent } from './dishboard.component';

describe('DishboardComponent', () => {
  let component: DishboardComponent;
  let fixture: ComponentFixture<DishboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
