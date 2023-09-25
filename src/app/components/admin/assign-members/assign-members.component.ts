import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { IMember } from 'src/app/interface';
import { Company } from 'src/app/store/company/company.action';

@Component({
  selector: 'app-assign-members',
  templateUrl: './assign-members.component.html',
  styleUrls: ['./assign-members.component.scss'],
})
export class AssignMembersComponent implements OnInit {
  disable: boolean = false;
  private unsubscribe$ = new Subject();
  users: IMember[] = [];
  selectAllOption: IMember = { firstName: 'Select All' };
  selectedUsersControl = new FormControl<IMember[]>([]);
  selectAllValue = false;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<AssignMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.assignmembersToManger();
    this.selectedUsersControl.valueChanges.subscribe(() => {
      this.updateSelectAllCheckbox();
    });
  }

  assignmembersToManger(): void {
    this.store
      .dispatch(
        new Company.getMembers({
          agencyId: this.data?.agencyId,
          managerId: this.data?.managerId,
          status:'all'
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        this.users = resp?.company?.managerEmployeeList;
      });
  }

  toggleSelectAll(): void {
    if (this.selectAllValue) {
      this.selectedUsersControl.setValue(this.users); // Select all users
    } else {
      this.selectedUsersControl.setValue([]); // Deselect all users
    }
  }

  updateSelectAllCheckbox(): void {
    const selectedUsers: any = this.selectedUsersControl.value;
    this.selectAllValue = selectedUsers.length === this.users.length;
    if (this.selectedUsersControl.value?.length) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  submitSelectedUsers(): void {
    const employeesId = this.selectedUsersControl.value?.map(
      (item) => item?.id
    );
    let obj = {
      memberIds: employeesId,
      managerId: this.data?.managerId,
      agencyId: this.data?.agencyId,
      userType: this.data?.role,

    };
    this.store
      .dispatch(new Company.AssignMembers(obj))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        if (resp) {
          this.dialogRef.close({ data: false });
        }
      });
  }
  cancel(): void {
    this.dialogRef.close({ data: false });
  }
}
