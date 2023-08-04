import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ILaunchAppraisal } from 'src/app/interface';
import { ComposeEmailComponent } from '../compose-email/compose-email.component';

@Component({
  selector: 'app-launch-appriasal',
  templateUrl: './launch-appriasal.component.html',
  styleUrls: ['./launch-appriasal.component.scss'],
})
export class LaunchAppriasalComponent implements OnInit {
  appraisalForm: FormGroup;
  isIndividualAppraisal: boolean = false;
  isCompanyAppraisal: boolean = false;
  dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  dropdownOptions1 = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  dropdownOptions2 = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  dropdownOptions3 = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.appraisalForm = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      year: ['', Validators.required],
      appraisalType: ['', Validators.required],
      employee: [''],
      company: [''],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.appraisalForm.get(field);
    return (
      (formControl?.invalid && (formControl?.touched || formControl?.dirty)) ||
      true
    );
  }

  onAppraisalTypeChange(selectedType: string) {
    this.isIndividualAppraisal = selectedType === 'individual';
    this.isCompanyAppraisal = selectedType === 'company';
    if (this.isIndividualAppraisal) {
      this.companyFromControl?.setValue('');
      this.employeeFromControl.setValidators([Validators.required]);
      this.companyFromControl.clearValidators();
      this.employeeFromControl.updateValueAndValidity();
      this.companyFromControl.updateValueAndValidity();
    } else {
      this.companyFromControl.setValidators([Validators.required]);
      this.employeeFromControl.clearValidators();
      this.employeeFromControl.updateValueAndValidity();
      this.companyFromControl.updateValueAndValidity();
      this.employeeFromControl?.setValue('');
    }
  }
  onSubmit(): void {
    if (this.appraisalForm.valid) {
      const formData: ILaunchAppraisal = this.prepareFormData();
      console.log('appraisalForm formData >>', formData);
      const dialogRef = this.dialog.open(ComposeEmailComponent, {
        data: formData,
        width: '900%',
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed', result);
      });
    } else {
      console.log('appraisalForm >>', this.appraisalForm.value);
      // handling error;
      this.appraisalForm.markAllAsTouched();
    }
  }

  private prepareFormData(): ILaunchAppraisal {
    const formData = { ...this.appraisalForm.value };
    return formData;
  }
  get employeeFromControl(): FormControl {
    return this.appraisalForm.get('employee') as FormControl;
  }
  get companyFromControl(): FormControl {
    return this.appraisalForm.get('company') as FormControl;
  }
}
