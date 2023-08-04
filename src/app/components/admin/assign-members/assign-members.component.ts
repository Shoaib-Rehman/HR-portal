import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface User {
  name: string;
  selected?: boolean;
}
@Component({
  selector: 'app-assign-members',
  templateUrl: './assign-members.component.html',
  styleUrls: ['./assign-members.component.scss'],
})
export class AssignMembersComponent implements OnInit {
  disable: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AssignMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  users: User[] = [
    { name: 'User 1' },
    { name: 'User 2' },
    { name: 'User 3' },
    { name: 'User 3' },
    { name: 'User 3' },
    { name: 'User 3' },
    { name: 'User 3' },
  ];

  selectAllOption: User = { name: 'Select All' };
  selectedUsersControl = new FormControl<User[]>([]);
  selectAllValue = false;

  toggleSelectAll() {
    if (this.selectAllValue) {
      this.selectedUsersControl.setValue(this.users); // Select all users
    } else {
      this.selectedUsersControl.setValue([]); // Deselect all users
    }
  }

  // Update the state of "Select All" checkbox based on selected users
  updateSelectAllCheckbox() {
    const selectedUsers: any = this.selectedUsersControl.value;
    this.selectAllValue = selectedUsers.length === this.users.length;
    if (this.selectedUsersControl.value?.length) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  // Subscribe to value changes to update "Select All" checkbox state
  ngOnInit() {
    this.selectedUsersControl.valueChanges.subscribe(() => {
      this.updateSelectAllCheckbox();
    });
    this.updateSelectAllCheckbox();
  }

  submitSelectedUsers() {
    const selectedUsers = this.selectedUsersControl.value;
    console.log(selectedUsers);

    this.dialogRef.close({ data: false });
  }
  cancel() {
    this.dialogRef.close({ data: false });
  }

  selectedMembers = new FormControl([]);
  members = [
    { name: 'Member 1', value: 'member1' },
    { name: 'Member 2', value: 'member2' },
    // Add more member options as needed
  ];

  onClose(): void {
    this.dialogRef.close();
  }

  onAssign(): void {
    // Get the selected members and perform the assignment logic here
    const selectedValues = this.selectedMembers.value;
    // (e.g., send the selected members to the server)
    // then close the dialog
    this.dialogRef.close();
  }
}
