import { Observable, Subject, takeUntil } from 'rxjs'
import { Select, Store } from '@ngxs/store'
import { Component, Inject, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators
} from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { IAddEmployee } from 'src/app/interface'
import { Company } from 'src/app/store/company/company.action'
import { CompanyState } from 'src/app/store/company/company.state'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup
  agencies: any[] = []
  submitted = false
  @Select(CompanyState.agenciesInfo)
  AgenciesList$?: Observable<any>
  selectedAgency: string = ''
  roles = [
    { value: 'Member', label: 'Member' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'CEO', label: 'CEO' }
  ]
  designation = [
    { value: 'CEO', label: 'CEO' },
    { value: 'CFO', label: 'CFO' },
    { value: 'Manager Internal Audit', label: 'Manager Internal Audit' },
    { value: 'Client Relation Manager', label: 'Client Relation Manager' },
    { value: 'Office Manager', label: 'Office Manager' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Recruiter', label: 'Recruiter' },
    { value: 'Office Admin/Receptionist', label: 'Office Admin/Receptionist' }
  ]

  constructor (
    private formBuilder: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.initForm()
  }

  ngOnInit (): void {
    // this.setValue(this.data);
    this.store.dispatch(new Company.GetAll())
    if (this.data?.agency) {
      // this.AgencyFormControl?.setValue(this.data?.agency);
      this.selectedAgency = this.data?.agency
      // this.selectedValue = this.data?.agency
    }
  }
  initForm (): UntypedFormGroup {
    const formGroup = this.formBuilder.group({
      agency: [''],
      location: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phoneNo: [''],
      password: ['1234567']
    })
    return this.disableFormControl(formGroup)

    // return formGroup;
  }
  // setValue(data: any): void {
  //   if (data?.firstName) {
  //     this.FirstNameFormControl.setValue(this.data?.firstName);
  //   }
  //   if (data?.middleName) {
  //     this.MiddleFormControl.setValue(this.data?.middleName);
  //   }
  //   if (data?.lastName) {
  //     this.LastNameFormControl.setValue(this.data?.lastName);
  //   }
  //   if (data?.dateOfJoining) {
  //     this.DateOfJoiningFormControl.setValue(this.data?.dateOfJoining);
  //   }
  //   if (data?.email) {
  //     this.EmailFormControl.setValue(this.data?.email);
  //   }
  //   if (data?.phoneNo) {
  //     this.phoneNumberFromControl.setValue(this.data?.phoneNo);
  //   }
  // }

  disableFormControl (formGroup: UntypedFormGroup): FormGroup {
    if (this.data?.agency) {
      formGroup.get('agency')?.disable()
      formGroup.get('agency')?.setValue(this.data?.agency)
      this.selectedAgency = this.data?.agency
    }
    if (this.data?.firstName) {
      formGroup.get('firstName')?.disable()
      formGroup.get('firstName')?.setValue(this.data?.firstName)
    }
    if (this.data?.middleName) {
      formGroup.get('middleName')?.disable()
      formGroup.get('middleName')?.setValue(this.data?.middleName)
    }
    if (this.data?.lastName) {
      formGroup.get('lastName')?.disable()
      formGroup.get('lastName')?.setValue(this.data?.lastName)
    }
    if (this.data?.dateOfJoining) {
      formGroup.get('dateOfJoining')?.disable()
      formGroup.get('dateOfJoining')?.setValue(this.data?.dateOfJoining)
    }
    if (this.data?.email) {
      formGroup.get('email')?.disable()
      formGroup.get('email')?.setValue(this.data?.email)
    }
    if (this.data?.phoneNo) {
      formGroup.get('phoneNo')?.disable()
      formGroup.get('phoneNo')?.setValue(this.data?.phoneNo)
    }
    return formGroup
  }

  submitForm (): void {
    this.submitted = true
    console.log(this.employeeForm)
    if (this.AgencyFormControl.value === '') {
      this.AgencyFormControl.setValidators(Validators.required)
      this.AgencyFormControl.updateValueAndValidity()
    }
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value)
      const formData = this.prepareFormData()
      this.store.dispatch(new Company.addEmployee(formData)).subscribe(resp => {
        if (resp) {
          this.close()
        }
      })
      console.log(formData)
    } else {
      // Mark all form fields as touched to trigger error messages
      Object.values(this.formControls).forEach(control => {
        control.markAsTouched()
      })
    }
  }

  private prepareFormData (): IAddEmployee {
    const formData = { ...this.employeeForm.getRawValue() }
    return formData
  }

  public close (): void {
    this.dialogRef.close({ data: false })
  }

  get formControls () {
    return this.employeeForm.controls
  }

  get AgencyFormControl (): FormControl {
    return this.employeeForm.get('agency') as FormControl
  }
  get LocationFormControl (): FormControl {
    return this.employeeForm.get('location') as FormControl
  }
  get FirstNameFormControl (): FormControl {
    return this.employeeForm.get('firstName') as FormControl
  }
  get MiddleFormControl (): FormControl {
    return this.employeeForm.get('middleName') as FormControl
  }
  get LastNameFormControl (): FormControl {
    return this.employeeForm.get('lastName') as FormControl
  }
  get DateOfJoiningFormControl (): FormControl {
    return this.employeeForm.get('dateOfJoining') as FormControl
  }
  get RoleFormControl (): FormControl {
    return this.employeeForm.get('role') as FormControl
  }
  get EmailFormControl (): FormControl {
    return this.employeeForm.get('email') as FormControl
  }
  get DesignationFormControl (): FormControl {
    return this.employeeForm.get('designation') as FormControl
  }
  get phoneNumberFromControl (): FormControl {
    return this.employeeForm.get('phoneNo') as FormControl
  }
}
