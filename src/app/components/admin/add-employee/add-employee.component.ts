import { Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
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
import { Company } from 'src/app/store/company/company.action';
import { CompanyState } from 'src/app/store/company/company.state';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  agencies: any[] = [];
  submitted = false;
  @Select(CompanyState.agenciesInfo)
  AgenciesList$?: Observable<any>;
  editEmployee: boolean = false;
  roles = [
    { value: 'Member', label: 'Member' },
    { value: 'TeamLead', label: 'Team Lead' },
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
    private store: Store,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.initForm();
  }

  ngOnInit(): void {
    this.store.dispatch(new Company.GetAll());
  }

  initForm(): UntypedFormGroup {
    const formGroup = this.formBuilder.group({
      agency: [''],
      location: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phoneNo: [''],
      password: ['1234567'],
    });
    return this.disableFormControl(formGroup);
  }

  disableFormControl(formGroup: UntypedFormGroup): FormGroup {
    if (this.data?.agency) {
      formGroup.get('agency')?.disable();
      formGroup.get('agency')?.setValue(+this.data?.agency);
    }
    if (this.data?.firstName) {
      formGroup.get('firstName')?.disable();
      formGroup.get('firstName')?.setValue(this.data?.firstName);
      this.editEmployee = true;
    }
    if (this.data?.middleName) {
      formGroup.get('middleName')?.disable();
      formGroup.get('middleName')?.setValue(this.data?.middleName);
    }
    if (this.data?.lastName) {
      formGroup.get('lastName')?.disable();
      formGroup.get('lastName')?.setValue(this.data?.lastName);
    }
    if (this.data?.dateOfJoining) {
      formGroup.get('dateOfJoining')?.disable();
      formGroup.get('dateOfJoining')?.setValue(this.data?.dateOfJoining);
    }
    if (this.data?.email) {
      formGroup.get('email')?.disable();
      formGroup.get('email')?.setValue(this.data?.email);
      this.editEmployee = true;
    }
    if (this.data?.phoneNo) {
      formGroup.get('phoneNo')?.disable();
      formGroup.get('phoneNo')?.setValue(this.data?.phoneNo);
    }
    return formGroup;
  }

  submitForm(): void {
    this.submitted = true;
    this.inputValidator();
    if (this.employeeForm.valid) {
      const formData = this.prepareFormData();
      if (this.editEmployee) {
        this.store
          .dispatch(new Company.EditEmployee({ ...formData, id: this.data.id }))
          .subscribe((resp) => {
            if (resp) {
              this.dialogRef.close({data:true})
            }
          });
      } else {
        this.store
          .dispatch(new Company.addEmployee(formData))
          .subscribe((resp) => {
            if (resp) {
              this.dialogRef.close({data:true})
              // this.close({data:true});
            }
          });
      }
    } else {
      // Mark all form fields as touched to trigger error messages
      Object.values(this.formControls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  private prepareFormData(): IAddEmployee {
    const formData = { ...this.employeeForm.getRawValue() };
    return formData;
  }

  inputValidator(): void {
    if (this.AgencyFormControl.value === '') {
      this.AgencyFormControl.setValidators(Validators.required);
      this.AgencyFormControl.updateValueAndValidity();
    }
    if (this.LocationFormControl.value.trim() === '') {
      this.LocationFormControl.setValidators(Validators.required);
      this.LocationFormControl.updateValueAndValidity();
    }
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
  get phoneNumberFromControl(): FormControl {
    return this.employeeForm.get('phoneNo') as FormControl;
  }
}
