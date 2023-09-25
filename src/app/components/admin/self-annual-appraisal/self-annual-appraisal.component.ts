import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Subject, takeUntil, Observable } from 'rxjs';
import { ROLE } from 'src/app/constant';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { Company } from 'src/app/store/company/company.action';
import { IUser } from 'src/app/store/company/company.interface';
import { CompanyModel } from 'src/app/store/company/company.model';
import { CompanyState } from 'src/app/store/company/company.state';

@Component({
  selector: 'app-self-annual-appraisal',
  templateUrl: './self-annual-appraisal.component.html',
  styleUrls: ['./self-annual-appraisal.component.scss'],
})
export class SelfAnnualAppraisalComponent implements OnInit, OnDestroy {
  @Select(CompanyState.userdetails)
  userdetails$?: Observable<CompanyModel>;
  objectives: any[] = [
    {
      name: 'Objective 1',
      expanded: false,
      isValueGreaterThanScore: false,
      isManagerScoreGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '40%',
        selfScore: '',
        managerScore: '',
        CEOScore: '',
      },
    },
    {
      name: 'Objective 2',
      expanded: false,
      isValueGreaterThanScore: false,
      isManagerScoreGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '30%',
        selfScore: '',
        managerScore: '',
        CEOScore: '',
      },
    },
    {
      name: 'Objective 3',
      expanded: false,
      isValueGreaterThanScore: false,
      isManagerScoreGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '20%',
        selfScore: '',
        managerScore: '',
        CEOScore: '',
      },
    },
    {
      name: 'Objective 4',
      expanded: false,
      isValueGreaterThanScore: false,
      isManagerScoreGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '10%',
        selfScore: '',
        managerScore: '',
        CEOScore: '',
      },
    },
  ];
  selfAppraisalForm: FormGroup;
  submittedSelfAppriasalData: any[] = [];
  disable: boolean = false;
  data: any;
  userDetails = this.localStorage.User;
  curtentUserId = this.localStorage.CurrentUserId;

  valuetrue: boolean = true;
  roleManager: boolean = false;
  private unsubscribe$ = new Subject();
  userId: string = '';
  paramsDetails: boolean = false;
  parmasId: string = '';
  role: string = this.localStorage.CurrentUserRole;
  disableSelfScore: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private toasterService: ToasterService
  ) {
    this.selfAppraisalForm = this.initForm();
  }
  ngOnInit(): void {
    this.getUserId();

    if (this.localStorage.CurrentUserRole === ROLE.MANAGER) {
      this.roleManager = true;
    }
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

  getSelfApriasalData(): void {
    this.store
      .dispatch(new Company.GetSelfApriasal(this.userId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        if (this.userId !== this.curtentUserId && this.role === 'Manager') {
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
          this.submittedSelfAppriasalData = resp.company.ApprisalDetails;
          this.data = this.submittedSelfAppriasalData[0];
          for (let i = 1; i <= 4; i++) {
            this.objectives[i - 1].content.objective =
              this.data[`objective_${i}`];
            this.objectives[i - 1].content.keyPerformanceIndicators =
              this.data[`kpi_${i}`];
            this.objectives[i - 1].content.actualPerformance =
              this.data[`actual_performance_${i}`];
            this.objectives[i - 1].content.score = `${
              this.data[`score_${i}`]
            }%`;
            this.objectives[i - 1].content.selfScore =
              this.data[`self_socre_${i}`];

            this.objectives[i - 1].content.managerScore =
              this.data[`manager_score_${i}`];
            this.objectives[i - 1].content.CEOScore = this.data[`CEOScore${i}`];
          }
          this.disableSelfScore = true;
          // if (
          //   this.data['actual_performance_1'] !== '' ||
          //   (this.data['actual_performance_1'] !== null &&
          //     this.role !== ROLE.MANAGER)
          // ) {
          //   this.disable = true;
          // }
        }
        if (this.userId === this.curtentUserId) {
          if (
            this.data?.actual_performance_1 !== undefined &&
            this.data?.actual_performance_1 !== null
          ) {
            this.disable = true;
          } else {
            this.disable = false;
          }
          console.log('Member');

          // this.disable = true;
        }
        // Manager to member OR CEO to Manager apprisal
        else if (
          this.userId !== this.curtentUserId &&
          this.role === 'Manager'
        ) {
          console.log('Manager');
          if (this.data?.['done_by_manager'] === 0) {
            this.disable = false;
          } else {
            this.disable = true;
          }
        } else if (this.userId !== this.curtentUserId && this.role === 'CEO') {
          console.log('CEO');
          if (this.data?.['done_by_ceo'] === 0) {
            this.disable = false;
          } else {
            this.disable = true;
          }
        } else {
          // HR view apprisal
          console.log('ROLE', 'Human Resource');
          this.disable = true;
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

  setValueDisableConrols(userData: any) {
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

  dataa: any;
  isDataValid(): void {
    this.dataa = this.objectives.map((objective) => {
      if (
        // objective.content.objective &&
        // objective.content.keyPerformanceIndicators
        this.userId === this.curtentUserId &&
        objective.content.actualPerformance &&
        objective.content.selfScore
      ) {
        return {
          objective: objective.content.objective,
          KeyPerformanceIndicators: objective.content.keyPerformanceIndicators,
          actualPerformance: objective.content.actualPerformance,
          score: +objective.content.score.slice(0, -1),
          selfScore: +objective.content.selfScore,
        };
      } else if (
        // objective.content.objective &&
        // objective.content.keyPerformanceIndicators
        this.userId !== this.curtentUserId &&
        objective.content.actualPerformance &&
        objective.content.selfScore &&
        objective.content.managerScore
      ) {
        return {
          objective: objective.content.objective,
          KeyPerformanceIndicators: objective.content.keyPerformanceIndicators,
          actualPerformance: objective.content.actualPerformance,
          score: +objective.content.score.slice(0, -1),
          selfScore: +objective.content.selfScore,
          managerScore: +objective.content.managerScore,
        };
      } else if (
        // objective.content.objective &&
        // objective.content.keyPerformanceIndicators
        // this.userId !== this.curtentUserId &&
        this.role === 'CEO' &&
        objective.content.actualPerformance &&
        objective.content.selfScore &&
        objective.content.CEOScore
      ) {
        return {
          objective: objective.content.objective,
          KeyPerformanceIndicators: objective.content.keyPerformanceIndicators,
          actualPerformance: objective.content.actualPerformance,
          score: +objective.content.score.slice(0, -1),
          selfScore: +objective.content.selfScore,
          CEOScore: +objective.content.CEOScore,
        };
      }
      return false;
    });
    this.dataa.find((res: any) => {
      console.log('ASADSDSDS', res);
      if (res === false) {
        this.valuetrue = false;
        this.toasterService.failed('Please filled all mandatory fields');
        return;
      } else {
        this.valuetrue = true;
      }
    });
  }

  saveData(): void {
    this.isDataValid();
    if (this.valuetrue !== false) {
      let performance: any[] = [];
      // will change to manager to member
      if (this.userId === this.curtentUserId) {
        performance.push({
          ...this.dataa,
          userId: this.userDetails?.id,
          is_selfApprisal: true,
          is_manager_to_other: false,
          is_CEO_to_manager: false,
        }); // member or manager self Apprisal
      }
      if (this.userId !== this.curtentUserId && this.role === 'Manager') {
        performance.push({
          ...this.dataa,
          userId: this.userDetails?.id,
          member_id: +this.userId,
          is_selfApprisal: false,
          is_manager_to_other: true,
          is_CEO_to_manager: false,
        }); // manager to member Apprisal
      }
      if (this.role === 'CEO') {
        performance.push({
          ...this.dataa,
          userId: this.userDetails?.id,
          manager_id: +this.userId,
          is_selfApprisal: false,
          is_manager_to_other: false,
          is_CEO_to_manager: true,
        }); // CEO to manager Apprisal
      }
      this.store
        .dispatch(new Company.launchSelfApriasal(performance))
        .subscribe((resp) => {
          if (resp) {
            if (this.paramsDetails) {
              this.router.navigateByUrl(
                '/annual-appraisal?id=' + this.parmasId
              );
            } else {
              this.router.navigateByUrl('/annual-appraisal');
            }
          }
        });
    } else {
    }
  }

  selfScoreValue(selfScore: number, score: string, index: number): void {
    score = score.slice(0, -1);
    if (selfScore > +score) {
      this.objectives[index].isValueGreaterThanScore = true; // Show the error message
    } else {
      this.objectives[index].isValueGreaterThanScore = false; // Hide the error message
      this.objectives[index].content.selfScore = selfScore;
    }
  }

  managerScoreValue(managerScore: number, score: string, index: number): void {
    score = score.slice(0, -1);
    if (managerScore > +score) {
      this.objectives[index].isManagerScoreGreaterThanScore = true; // Show the error message
    } else {
      this.objectives[index].isManagerScoreGreaterThanScore = false; // Hide the error message
      this.objectives[index].content.managerScore = managerScore;
    }
  }

  nextPage(): void {
    if (this.paramsDetails) {
      this.router.navigateByUrl('/annual-appraisal?id=' + this.parmasId);
    } else {
      this.router.navigateByUrl('/annual-appraisal');
    }
  }

  get NameFormControl(): FormControl {
    return this.selfAppraisalForm.get('name') as FormControl;
  }

  get LocationFormControl() {
    return this.selfAppraisalForm.get('location');
  }

  get PositionFormControl() {
    return this.selfAppraisalForm.get('position');
  }

  get DateFormControl() {
    return this.selfAppraisalForm.get('date');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(false);
    this.unsubscribe$.complete();
  }
}
