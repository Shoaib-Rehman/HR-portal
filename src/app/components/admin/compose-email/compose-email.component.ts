import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss'],
})
export class ComposeEmailComponent implements OnInit {
  composeEmail: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ComposeEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.composeEmail = this.initForm();
  }

  ngOnInit(): void {
    this.setValues()
  }
  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      recipientName: ['', Validators.required],
      subject: ['', Validators.required],
      discription: ['', Validators.required],
    });
  }
  setValues(): void {
    this.recipientFormControlName.setValue(this.data?.employee);
  }

  onSubmit() { }
  cancel(): void {
    this.dialogRef.close()
  }

  get recipientFormControlName(): FormControl {
    return this.composeEmail.get('recipientName') as FormControl;
  }
  get subjectFormControlName(): FormControl {
    return this.composeEmail.get('subject') as FormControl;
  }
  get descriptionFormControlName(): FormControl {
    return this.composeEmail.get('recipientName') as FormControl;
  }
}