import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.initForm();
  }

  ngOnInit(): void {}

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

  submitForm(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      const formData = this.prepareFormData();
      console.log(formData);
    } else {
      // handling error;
      this.employeeForm.markAllAsTouched();
    }
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.employeeForm.get(field);
    return (
      (formControl?.invalid && (formControl?.touched || formControl?.dirty)) ||
      true
    );
  }

  private prepareFormData(): IAddEmployee {
    const formData = { ...this.employeeForm.value };
    return formData;
  }
}
