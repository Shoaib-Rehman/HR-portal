import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { CustomToasterComponent } from '../custom-toaster/custom-toaster.component';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CompanyState } from 'src/app/store/company/company.state';
import { CompanyModel } from 'src/app/store/company/company.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/store/company/company.interface';
import { Company } from 'src/app/store/company/company.action';

@Component({
  selector: 'app-annual-apprsaial',
  templateUrl: './annual-apprsaial.component.html',
  styleUrls: ['./annual-apprsaial.component.scss'],
})
export class AnnualApprsaialComponent implements OnInit {
  @Select(CompanyState.userdetails)
  userdetails$?: Observable<CompanyModel>;
  annualAppraisal: FormGroup;
  userDetails?: IUser;
  disableBoxes: boolean = true;
  private unsubscribe$ = new Subject();
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

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private toasterService: ToasterService,
    private dialog: MatDialog
  ) {
    this.annualAppraisal = this.initForm();
  }

  ngOnInit(): void {
    this.getSelfApriasalData();
  }
  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      name: [''],
      location: [''],
      position: [''],
      date: [''],
      comment: [''],
    });
  }

  getSelfApriasalData(): void {
    this.userdetails$?.subscribe((resp: any) => {
      if (resp) {
        this.userDetails = resp;
        this.setValueDisableConrols(resp);
        this.store
          .dispatch(new Company.GetCompetencyApriasal(this.userDetails?.id))
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((resp) => {
            if (resp.company.ApprisalDetails.length) {
              const data = resp.company.ApprisalDetails[0];
              this.selectedBoxes['workEthics'] = data?.workEthics;
              this.selectedBoxes['jobKnowledge'] = data?.jobKnowledge;
              this.selectedBoxes['qualityWork'] = data?.qualityWork;
              this.selectedBoxes['Productivity'] = data?.Productivity;
              this.selectedBoxes['Dependability'] = data?.Dependability;
              this.selectedBoxes['Discipline'] = data?.Discipline;
              this.selectedBoxes['CommunicationSkills'] =
                data?.CommunicationSkills;
              this.CommentFormControl.disable();
              this.CommentFormControl.setValue(data?.comment);
              this.disableBoxes = false;
            }
          });
      }
    });
  }

  setValueDisableConrols(userData: IUser) {
    this.NameFormControl?.disable();
    this.NameFormControl?.setValue(userData?.firstName);

    this.LocationFormControl?.disable();
    this.LocationFormControl?.setValue(userData?.location || 'N/A');

    this.PositionFormControl?.disable();
    this.PositionFormControl?.setValue(userData?.role);

    this.DateFormControl?.disable();
    this.DateFormControl?.setValue(
      new Date().getFullYear() + '-' + (new Date().getFullYear() + 1)
    );
  }
  selectedOption: string | undefined;
  isSelected(category: string, boxNumber: number): boolean {
    return (
      boxNumber === this.selectedBoxes[category] ||
      boxNumber < this.selectedBoxes[category]
    );
  }

  selectBox(category: string, boxNumber: number): void {
    if (this.disableBoxes) {
      this.selectedBoxes[category] = boxNumber;
    }
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

  valueNotNull: boolean = true;
  submit() {
    for (const [key, value] of Object.entries(this.selectedBoxes)) {
      if (value == null) {
        this.toasterService.success('Please rate all Role based Competency');
        this.valueNotNull = false;
        return;
      } else {
        this.valueNotNull = true;
      }
    }
    if (this.valueNotNull) {
      this.store
        .dispatch(new Company.launchCompetencyApriasal(this.prepareFormData()))
        .subscribe((resp) => {
          if (resp) {
            this.router.navigateByUrl('/next-year-objective');
          }
        });
    }

    const dialogRef = this.dialog.open(CustomToasterComponent, {});
    dialogRef.afterClosed().subscribe((result) => {});
  }

  private prepareFormData(): any {
    const formData = {
      rating: this.selectedBoxes,
      totalRating: this.calculateSum(),
      comment: this.CommentFormControl.value,
      userId: this.userDetails?.id, // will change according to the login user
    };
    return formData;
  }

  goBack(): void {
    this.router.navigateByUrl('/self-appraisal');
  }

  nextPage() {
    this.router.navigateByUrl('/next-year-objective');
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
