import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { CustomToasterComponent } from '../custom-toaster/custom-toaster.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-annual-apprsaial',
  templateUrl: './annual-apprsaial.component.html',
  styleUrls: ['./annual-apprsaial.component.scss'],
})
export class AnnualApprsaialComponent implements OnInit {
  annualAppraisal: FormGroup;
  // userId: string = '';

  constructor(
    private formBuilder: FormBuilder,private router: Router,
    private toasterService: ToasterService,private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
    this.annualAppraisal = this.initForm();
  }

  ngOnInit(): void {
    this.setValues();
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   console.log("params",params?.['id']);
    //   this.userId = params?.['id']
    // });
  }
  initForm(): UntypedFormGroup {
    const formGroup = this.formBuilder.group({
      name: [''],
      location: [''],
      position: [''],
      date: [''],
      comment:['']
    });
    return this.disableFormControl(formGroup);
  }

  disableFormControl(formGroup: UntypedFormGroup): FormGroup {
    // if (this.name?.agency) {
    formGroup.get('name')?.disable();
    formGroup.get('name')?.setValue('Majid');
    // }
    // if (this.data?.firstName) {
    formGroup.get('position')?.disable();
    formGroup.get('position')?.setValue('Team member');
    // this.editEmployee = true;
    // }
    // if (this.data?.middleName) {
    formGroup.get('location')?.disable();
    formGroup.get('location')?.setValue('Islamabad');
    // }
    // if (this.data?.lastName) {
    formGroup.get('date')?.disable();
    formGroup.get('date')?.setValue('2023-2024');
    // }
    return formGroup;
  }
  setValues (): void {
    this.NameFormControl?.setValue('Abdul Majid');
    this.LocationFormControl?.setValue('toronto');
    this.PositionFormControl?.setValue('Team member')
    this.DateFormControl?.setValue("2023 - 2024");
  }
 
  selectedOption: string | undefined;

  // role based competendense work ****************
  boxNumbers: number[] = [1, 2, 3, 4, 5];
  selectedBoxes: { [key: string]: any } = {
    workEthics: null,
    jobKnowledge: null,
    qualityWork: null,
    Productivity: null,
    Dependability: null,
    Discipline: null,
    CommunicationSkills: null,
  };
  disable = true;
  isSelected(category: string, boxNumber: number): boolean {
    return (
      boxNumber === this.selectedBoxes[category] ||
      boxNumber < this.selectedBoxes[category]
    );
  }

  selectBox(category: string, boxNumber: number): void {
    this.selectedBoxes[category] = boxNumber;
  }
  calculateSum(): number {
    let sum = 0;
    for (const category in this.selectedBoxes) {
      if (this.selectedBoxes[category] !== null) {
        sum += this.selectedBoxes[category];
      }
    }
    return sum;
  }

  submit() {
    for (const [key, value] of Object.entries(this.selectedBoxes)) {
      if (value == null) {
        this.toasterService.success(
          'Please rate all Role based Competency'
        );
        return;
      } else {
        console.log("DATA", this.prepareFormData())
        this.router.navigateByUrl('/next-year-objective')
     
      }
    }
    const dialogRef = this.dialog.open(CustomToasterComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private prepareFormData(): any {
    const formData = {
      rating: this.selectedBoxes,
      totalRating: this.calculateSum(),
      comment: this.CommentFormControl.value,
      userId: 1043, // will change according to the login user
    };
    return formData;
  }

  goBack(): void {
    this.router.navigateByUrl('/self-appraisal')
  }

  get NameFormControl(): FormControl {
    return this.annualAppraisal.get('name') as FormControl;
  }

  get LocationFormControl(): FormControl {
    return this.annualAppraisal.get('location') as FormControl;
  }

  get PositionFormControl(): FormControl {
    return this.annualAppraisal.get('position') as FormControl;
  }

  get DateFormControl(): FormControl {
    return this.annualAppraisal.get('date') as FormControl;
  }
  get CommentFormControl(): FormControl {
    return this.annualAppraisal.get('comment') as FormControl;
  }
}
