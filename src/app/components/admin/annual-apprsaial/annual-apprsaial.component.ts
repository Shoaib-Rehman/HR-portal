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
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CompanyState } from 'src/app/store/company/company.state';
import { CompanyModel } from 'src/app/store/company/company.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/store/company/company.interface';
import { Company } from 'src/app/store/company/company.action';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-annual-apprsaial',
  templateUrl: './annual-apprsaial.component.html',
  styleUrls: ['./annual-apprsaial.component.scss'],
})
export class AnnualApprsaialComponent implements OnInit {
  @Select(CompanyState.userdetails)
  userdetails$?: Observable<CompanyModel>;
  annualAppraisal: FormGroup;
  disableBoxes: boolean = true;
  userId: string = '';
  userDetails = this.localStorage.User;
  currentUserRole = this.localStorage.CurrentUserRole;
  curtentUserId = this.localStorage.CurrentUserId;
  paramsDetails: boolean = false;
  parmasId: string = '';
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
    private localStorage: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.annualAppraisal = this.initForm();
  }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params?.['id']) {
        this.userId = params?.['id'];
        this.parmasId = params?.['id'];
      } else {
        this.userId = this.localStorage.User?.id;
      }
      this.getSelfApriasalData();
    });
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
    this.store
      .dispatch(new Company.GetCompetencyApriasal(this.userId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        if (this.userId !== this.curtentUserId) {
          this.paramsDetails = true;
          this.setValueDisableConrols(resp.company.ApprisalDetails[0]);
          
        } else {
          this.paramsDetails = false;
          this.setValueDisableConrols(this.userDetails);
        }
        const data = resp.company.ApprisalDetails[0];
        if (data?.workEthics) {
          this.selectedBoxes['workEthics'] = data?.workEthics;
          this.selectedBoxes['jobKnowledge'] = data?.jobKnowledge;
          this.selectedBoxes['qualityWork'] = data?.qualityWork;
          this.selectedBoxes['Productivity'] = data?.Productivity;
          this.selectedBoxes['Dependability'] = data?.Dependability;
          this.selectedBoxes['Discipline'] = data?.Discipline;
          this.selectedBoxes['CommunicationSkills'] = data?.CommunicationSkills;
          // this.CommentFormControl.disable();
          this.CommentFormControl.setValue(data?.comment);
        }
        this.enableFieldsButtonRoleBased(data);
      });
  }

  enableFieldsButtonRoleBased(data: any): void {
    if (this.userId === this.curtentUserId) {
      console.log('Member');
      if (data?.workEthics !== undefined && data?.workEthics !== null) {
        this.disableBoxes = false;
        this.CommentFormControl.disable();
      } else {
        this.disableBoxes = true;
      }
    }
    // Manager to member OR CEO to Manager apprisal
    else if (
      this.userId !== this.curtentUserId &&
      this.currentUserRole === 'Manager'
    ) {
      console.log('Manager');
      if (data['competency_done_manager'] === 0) {
        this.disableBoxes = true;
      } else {
        this.disableBoxes = false;
        this.CommentFormControl.disable();
      }
    } else if (
      this.userId !== this.curtentUserId &&
      this.currentUserRole === 'CEO'
    ) {
      console.log('CEO');
      if (data['competency_done_ceo'] === 0) {
        this.disableBoxes = true;
      } else {
        this.disableBoxes = false;
        this.CommentFormControl.disable();
      }
    }
    else {
      // HR view apprisal
      console.log('ROLE', 'Human Resource');
      this.disableBoxes = false;
      this.CommentFormControl.disable();
    }
  }

  setValueDisableConrols(userData: IUser) {
    this.NameFormControl?.disable();
    this.NameFormControl?.setValue(
      userData?.firstName + ' ' + userData?.lastName
    );

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
    console.log('fromrdata', this.prepareFormData());
    if (this.valueNotNull) {
      this.store
        .dispatch(new Company.launchCompetencyApriasal(this.prepareFormData()))
        .subscribe((resp) => {
          if (resp) {
            this.nextPage();
          }
        });
    }
  }

  private prepareFormData(): any {
    let formData: any;
    formData = {
      rating: this.selectedBoxes,
      totalRating: this.calculateSum(),
      comment: this.CommentFormControl.value,
      userId: this.userDetails?.id, // will change according to the login user
    };
    if (this.userId === this.curtentUserId) {
      formData = {
        ...formData,
        is_selfApprisal: true,
        is_manager_to_other: false,
        is_CEO_to_manager: false,
        agency_id: +this.userDetails?.agency,
      };
      return formData;
    }
    if (
      this.userId !== this.curtentUserId &&
      this.currentUserRole === 'Manager'
    ) {
      formData = {
        ...formData,
        member_id: +this.userId,
        is_selfApprisal: false,
        is_manager_to_other: true,
        is_CEO_to_manager: false,
      };

      return formData;
    }
    if (
      this.userId !== this.curtentUserId &&
      this.currentUserRole === 'CEO'
    ) {
      formData = {
        ...formData,
        member_id: +this.userId,
        is_selfApprisal: false,
        is_manager_to_other: false,
        is_CEO_to_manager: true,
      };
      return formData;
    }
    return false;
  }

  goBack(): void {
    if (this.userId !== this.curtentUserId) {
      this.router.navigateByUrl('/self-appraisal?id=' + this.parmasId);
    } else {
      this.router.navigateByUrl('/self-appraisal');
    }
  }

  nextPage() {
    if (this.userId !== this.curtentUserId) {
      this.router.navigateByUrl('/next-year-objective?id=' + this.parmasId);
    } else {
      this.router.navigateByUrl('/next-year-objective');
    }
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
