import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMembersListComponent } from './assign-members-list.component';

describe('AssignMembersListComponent', () => {
  let component: AssignMembersListComponent;
  let fixture: ComponentFixture<AssignMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMembersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
