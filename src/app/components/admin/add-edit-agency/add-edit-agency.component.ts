import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ERROR } from 'src/app/constant';

@Component({
  selector: 'app-add-edit-agency',
  templateUrl: './add-edit-agency.component.html',
  styleUrls: ['./add-edit-agency.component.scss'],
})
export class AddEditAgencyComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): FormGroup {
    return new FormGroup({
      agencyName: new FormControl(),
      agencyLocation: new FormControl(),
      officeManager: new FormControl(),
      crmManager: new FormControl(),
    });
  }

  onSubmit(): void {}

  get AgencyNameError(): string {
    if (this.AgencyNameControl.hasError('required')) {
      return ERROR.REQUIRED.AGENCY_NAME;
    }

    return this.AgencyNameControl.hasError('agencyName')
      ? ERROR.NOT_VALID.AGENCY_NAME
      : '';
  }

  get AgencyNameControl(): FormControl {
    return this.form.get('agencyName') as FormControl;
  }

  get AgencyLocationControl(): FormControl {
    return this.form.get('agencyLocation') as FormControl;
  }

  get OfficeManagerControl(): FormControl {
    return this.form.get('officeManager') as FormControl;
  }

  get CRMManagerControl(): FormControl {
    return this.form.get('crmManager') as FormControl;
  }
}
