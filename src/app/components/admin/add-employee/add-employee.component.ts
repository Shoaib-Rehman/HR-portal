import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAddEmployee } from 'src/app/interface';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  agencies = [
    {
      value: 'Option 1',
      label: 'Option 1',
    },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 1', label: 'Option 1' },
  ];

  officeLocation = [
    {
      value: 'Option 1',
      label: 'Option 1',
    },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 1', label: 'Option 1' },
  ];
  roles = [
    { value: 'Member', label: 'Member' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'CEO', label: 'CEO' },
  ];
  designation = [
    { value: 'CEO', label: 'CEO' },
    { value: 'CFO', label: 'CFO' },
    { value: 'Manager Internal Audit', label: 'Manager Internal Audit' },
    { value: 'Client Relation Manager', label: 'Client Relation Manager' },
    { value: 'Office Manager', label: 'Office Manager' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Recruiter', label: 'Recruiter' },
    { value: 'Office Admin/Receptionist', label: 'Office Admin/Receptionist' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.initForm();
  }

  ngOnInit(): void {
    this.setValue(this.data);
  }

  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      agency: ['', Validators.required],
      location: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dateOfJoining: [''],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
    });
  }
  setValue(data: any): void {
    if (data?.name) {
      this.FirstNameFormControl.setValue(this.data?.name);
    }
    if (data?.dateOfJoining) {
      this.DateOfJoiningFormControl.setValue(this.data?.dateOfJoining);
    }
    if (data?.lastName) {
      this.LastNameFormControl.setValue(this.data?.lastName);
    }
    if (data?.middleName) {
      this.MiddleFormControl.setValue(this.data?.middleName);
    }
    if (data?.email) {
      this.EmailFormControl.setValue(this.data?.email);
    }
  }

  submitForm(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      const formData = this.prepareFormData();
      console.log(formData);
    } else {
      // Mark all form fields as touched to trigger error messages
      Object.values(this.formControls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  private prepareFormData(): IAddEmployee {
    const formData = { ...this.employeeForm.value };
    return formData;
  }

  public close(): void {
    this.dialogRef.close({ data: false });
  }

  get formControls() {
    return this.employeeForm.controls;
  }

  get AgencyFormControl(): FormControl {
    return this.employeeForm.get('agency') as FormControl;
  }
  get LocationFormControl(): FormControl {
    return this.employeeForm.get('location') as FormControl;
  }
  get FirstNameFormControl(): FormControl {
    return this.employeeForm.get('firstName') as FormControl;
  }
  get MiddleFormControl(): FormControl {
    return this.employeeForm.get('middleName') as FormControl;
  }
  get LastNameFormControl(): FormControl {
    return this.employeeForm.get('lastName') as FormControl;
  }
  get DateOfJoiningFormControl(): FormControl {
    return this.employeeForm.get('dateOfJoining') as FormControl;
  }
  get RoleFormControl(): FormControl {
    return this.employeeForm.get('role') as FormControl;
  }
  get EmailFormControl(): FormControl {
    return this.employeeForm.get('email') as FormControl;
  }
  get DesignationFormControl(): FormControl {
    return this.employeeForm.get('designation') as FormControl;
  }
}
