import { Company } from 'src/app/store/company/company.action';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ILaunchAppraisal } from 'src/app/interface';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss'],
})
export class ComposeEmailComponent implements OnInit {
  composeEmailForm: FormGroup;
  isRecipentDisable: boolean = true;
  constructor(
    private dialogRef: MatDialogRef<ComposeEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.composeEmailForm = this.initForm();
  }

  ngOnInit(): void {
    this.setValues();
  }
  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      recipientName: ['', Validators.required],
      subject: ['', Validators.required],
      discription: ['', Validators.required],
    });
  }

  setValues(): void {
    if (this.data?.employee) {
      this.recipientFormControlName.setValue(
        this.data?.employee?.firstName + '' + this.data?.employee?.lastName
      );
    } else {
      this.recipientFormControlName.setValue(this.data?.company?.name);
    }
    this.recipientFormControlName.disable();
  }
  onSubmit() {
    if (this.composeEmailForm.valid) {
    const formData: ILaunchAppraisal = this.prepareFormData();
    this.store.dispatch(new Company.launchAppriasal(formData)).subscribe(resp => {
      if(resp) {
        this.cancel();
      }
    })
    }
  }

  private prepareFormData(): ILaunchAppraisal {
    let apprisalDetail = {
      id: this.data?.employee?.id,
      appraisalType: this.data?.appraisalType,
      year: this.data.year,
      agencyId: this.data.company?.id,
    };
    const formData = { ...this.composeEmailForm.getRawValue(), apprisalDetail };
    return formData;
  }

  disableSubmitButton(): boolean {
    if (
      this.subjectFormControlName.value.trim() === '' ||
      this.descriptionFormControlName.value.trim() === ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  get recipientFormControlName(): FormControl {
    return this.composeEmailForm.get('recipientName') as FormControl;
  }
  get subjectFormControlName(): FormControl {
    return this.composeEmailForm.get('subject') as FormControl;
  }
  get descriptionFormControlName(): FormControl {
    return this.composeEmailForm.get('discription') as FormControl;
  }
}
