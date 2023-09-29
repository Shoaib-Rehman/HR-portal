import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Company } from 'src/app/store/company/company.action';
import { IUser } from 'src/app/store/company/company.interface';
import { CompanyModel } from 'src/app/store/company/company.model';
import { CompanyState } from 'src/app/store/company/company.state';
import { CustomToasterComponent } from '../custom-toaster/custom-toaster.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Component({
  selector: 'app-next-year-objectives',
  templateUrl: './next-year-objectives.component.html',
  styleUrls: ['./next-year-objectives.component.scss'],
})
export class NextYearObjectivesComponent implements OnInit, OnDestroy {
  @Select(CompanyState.userdetails)
  userdetails$?: Observable<CompanyModel>;
  userDetails = this.localStorage.User;
  curtentUserId = this.localStorage.CurrentUserId;
  role: string = this.localStorage.CurrentUserRole;

  objectives: any[] = [
    {
      name: 'Objective 1',
      expanded: false,
      isValueGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        score: '40%',
      },
    },
    {
      name: 'Objective 2',
      expanded: false,
      isValueGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        score: '30%',
      },
    },
    {
      name: 'Objective 3',
      expanded: false,
      isValueGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        score: '20%',
      },
    },
    {
      name: 'Objective 4',
      expanded: false,
      isValueGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        score: '10%',
      },
    },
  ];
  nextYearForm: FormGroup;
  submittedNextYearAppriasalData: any[] = [];
  hideButtonsAndDisableFields: boolean = false;
  data: any;
  private unsubscribe$ = new Subject();
  userId: string = '';
  paramsDetails: boolean = false;
  parmasId: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private toasterService: ToasterService
  ) {
    this.nextYearForm = this.initForm();
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
      this.apprisalDetail();
    });
  }

  apprisalDetail(): void {
    this.store
      .dispatch(new Company.GetNextYearApriasal(this.userId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        if (this.userId !== this.curtentUserId) {
          this.paramsDetails = true;
          this.setValueDisableConrols(resp.company.ApprisalDetails[0]);
        } else {
          this.paramsDetails = false;
          this.setValueDisableConrols(this.userDetails);
        }
        if (
          resp.company.ApprisalDetails[0]?.objective_1 !== undefined &&
          resp.company.ApprisalDetails[0]?.objective_1 !== null
        ) {
          this.submittedNextYearAppriasalData = resp.company.ApprisalDetails;
          this.data = this.submittedNextYearAppriasalData[0];
          for (let i = 1; i <= 4; i++) {
            this.objectives[i - 1].content.objective =
              this.data[`objective_${i}`];
            this.objectives[i - 1].content.keyPerformanceIndicators =
              this.data[`kpi_${i}`];
            this.objectives[i - 1].content.score = `${
              this.data[`score_${i}`]
            }%`;
          }
          // member and manager apprisal details

          // if (this.data['kpi__1'] !== '' || this.data['kpi__1'] !== null) {
          //   this.hideButtonsAndDisableFields = true;
          // }
        }
        if (this.userId === this.curtentUserId) {
          if (
            this.data?.objective_1 !== undefined &&
            this.data?.objective_1 !== null
          ) {
            this.hideButtonsAndDisableFields = true;
          } else {
            this.hideButtonsAndDisableFields = false;
          }
          console.log('Member');

          // this.hideButtonsAndDisableFields = true;
        }
        // Manager to member OR CEO to Manager apprisal
        else if (
          this.userId !== this.curtentUserId &&
          this.role === 'Manager'
        ) {
          console.log('Manager');
          if (this.data['next_year_done_manager'] === 0) {
            this.hideButtonsAndDisableFields = false;
          } else {
            this.hideButtonsAndDisableFields = true;
          }
        } else if (this.userId !== this.curtentUserId && this.role === 'CEO') {
          console.log('Manager', 'CEO');
          if (this.data['next_year_done_ceo'] === 0) {
            this.hideButtonsAndDisableFields = false;
          } else {
            this.hideButtonsAndDisableFields = true;
          }
        } else {
          // HR view apprisal
          console.log('ROLE', 'Human Resource');
          this.hideButtonsAndDisableFields = true;
        }
      });
  }

  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
    });
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

  toggleTextArea(objective: any): void {
    objective.showTextArea = !objective.showTextArea;
  }

  toggleObjective(index: number): void {
    this.objectives[index].expanded = !this.objectives[index].expanded;
  }

  isExpanded(index: number): boolean {
    return this.objectives[index].expanded;
  }
  valuetrue: boolean = true;
  saveData(): void {
    const data: any = this.objectives.map((objective) => {
      if (
        objective.content.objective &&
        objective.content.keyPerformanceIndicators
      ) {
        return {
          objective: objective.content.objective,
          KeyPerformanceIndicators: objective.content.keyPerformanceIndicators,
          score: +objective.content.score.slice(0, -1),
        };
      } else {
        return false;
      }
    });
    this.valuetrue = data.find((res: any) => {
      if (res === false) {
        this.toasterService.failed('Please verify something wrong in the data');
        return true;
      } else {
        return false;
      }
    });
    if (this.valuetrue !== false) {
      let performance: any[] = [];
      if (this.userId === this.curtentUserId) {
        performance.push({
          ...data,
          userId: this.userDetails?.id,
          is_selfApprisal: true,
          is_manager_to_other: false,
          is_CEO_to_manager: false,
          agency_id: +this.userDetails?.agency,
        }); // member or manager self Apprisal
      }
      if (this.userId !== this.curtentUserId && this.role === 'Manager') {
        performance.push({
          ...data,
          userId: this.userDetails?.id,
          member_id: +this.userId,
          is_selfApprisal: false,
          is_manager_to_other: true,
          is_CEO_to_manager: false,
        }); // manager to member Apprisal
      }
      if (this.userId !== this.curtentUserId && this.role === 'CEO') {
        performance.push({
          ...data,
          userId: this.userDetails?.id,
          member_id: +this.userId,
          is_selfApprisal: false,
          is_manager_to_other: false,
          is_CEO_to_manager: true,
        }); // CEO to manager Apprisal
      }

      // performance.push({ ...data, userId: this.userDetails?.id });
      this.store
        .dispatch(new Company.launchNextYearApriasal(performance))
        .subscribe((resp) => {
          if (resp) {
            const dialogRef = this.dialog.open(CustomToasterComponent, {
              width: '587px',
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.backToApprisal();
            });
          }
        });
    }
  }
  backPage() {
    if (this.userId !== this.curtentUserId) {
      this.router.navigateByUrl('/annual-appraisal?id=' + this.parmasId);
    } else {
      this.router.navigateByUrl('/annual-appraisal');
    }
  }
  backToApprisal(): void {
    this.router.navigateByUrl('/employee-results')
    // if (this.userId !== this.curtentUserId) {
    //   this.router.navigateByUrl('/assign-members');
    // } else {
    //   this.apprisalDetail();
    // }
  }

  get NameFormControl(): FormControl {
    return this.nextYearForm.get('name') as FormControl;
  }

  get LocationFormControl() {
    return this.nextYearForm.get('location');
  }

  get PositionFormControl() {
    return this.nextYearForm.get('position');
  }

  get DateFormControl() {
    return this.nextYearForm.get('date');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(false);
    this.unsubscribe$.complete();
  }
}
