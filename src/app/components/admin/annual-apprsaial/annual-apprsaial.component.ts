import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { CustomToasterComponent } from '../custom-toaster/custom-toaster.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annual-apprsaial',
  templateUrl: './annual-apprsaial.component.html',
  styleUrls: ['./annual-apprsaial.component.scss'],
})
export class AnnualApprsaialComponent implements OnInit {
  annualAppraisal: FormGroup;

  constructor(
    private formBuilder: FormBuilder,private router: Router,
    private toasterService: ToasterService,private dialog: MatDialog
  ) {
    this.annualAppraisal = this.initForm();
  }

  ngOnInit(): void {
    this.setValues();
  }
  initForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  setValues (): void {
    this.NameFormControl?.setValue('Abdul Majid');
    this.LocationFormControl?.setValue('toronto');
    this.PositionFormControl?.setValue('Team member')
    this.DateFormControl?.setValue("2023 - 2024");
  }
  dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

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
        console.log(value);
        this.toasterService.openSnackBar(
          'Please rate all Role based competendes'
        );
        return;
      } else {
        console.log('fromData >>>>>', this.prepareFormData());
        this.router.navigateByUrl('/next-year-objective')
     
      }
    }
    const dialogRef = this.dialog.open(CustomToasterComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  private prepareFormData(): any {
    const formData = {
      rating: this.selectedBoxes,
      totalRating: this.calculateSum(),
    };
    return formData;
  }

  goBack(): void {
    this.router.navigateByUrl('/selfAppraisal')
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
}
