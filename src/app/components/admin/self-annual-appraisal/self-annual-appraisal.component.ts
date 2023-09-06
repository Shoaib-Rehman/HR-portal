import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Subject, takeUntil, Observable } from 'rxjs';
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
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '40%',
        selfScore: '',
        managerScore: '',
      },
    },
    {
      name: 'Objective 2',
      expanded: false,
      isValueGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '30%',
        selfScore: '',
        managerScore: '',
      },
    },
    {
      name: 'Objective 3',
      expanded: false,
      isValueGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '20%',
        selfScore: '',
        managerScore: '',
      },
    },
    {
      name: 'Objective 4',
      expanded: false,
      isValueGreaterThanScore: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '10%',
        selfScore: '',
        managerScore: '',
      },
    },
  ];
  selfAppraisalForm: FormGroup;
  submittedSelfAppriasalData: any[] = [];
  disable: boolean = false;
  data: any;
  userDetails?: IUser;
  valuetrue: boolean = true;
  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.selfAppraisalForm = this.initForm();
  }
  ngOnInit(): void {
    this.getSelfApriasalData();
  }

  getSelfApriasalData(): void {
    this.userdetails$?.subscribe((resp: any) => {
      if (resp) {
        this.userDetails = resp;
        this.setValueDisableConrols(resp);
        this.store
          .dispatch(new Company.GetSelfApriasal(this.userDetails?.id))
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((resp) => {
            if (resp.company.ApprisalDetails.length) {
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
              }
              if (
                this.data['actual_performance_1'] !== '' ||
                this.data['actual_performance_1'] !== null
              ) {
                this.disable = true;
              }
            }
          });
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

  toggleTextArea(objective: any): void {
    objective.showTextArea = !objective.showTextArea;
  }

  toggleObjective(index: number): void {
    this.objectives[index].expanded = !this.objectives[index].expanded;
  }

  isExpanded(index: number): boolean {
    return this.objectives[index].expanded;
  }
 
  saveData(): void {
    const data: any = this.objectives.map((objective) => {
      if (
        objective.content.objective &&
        objective.content.keyPerformanceIndicators &&
        objective.content.actualPerformance &&
        objective.content.selfScore
      ) {
        return {
          objective: objective.content.objective,
          KeyPerformanceIndicators: objective.content.keyPerformanceIndicators,
          actualPerformance: objective.content.actualPerformance,
          score: +objective.content.score.slice(0, -1),
          selfScore: +objective.content.selfScore,
          managerScore: +objective.content.managerScore,
        };
      } else {
        return false;
      }
    });
    data.find((res: any) => {
      if (res === false) {
        this.valuetrue = false;
        return;
      } else {
        this.valuetrue = true;
      }
    });
    if (this.valuetrue !== false) {
      let performance: any[] = [];
      performance.push({ ...data, userId: this.userDetails?.id }); // change userId
      this.store
        .dispatch(new Company.launchSelfApriasal(performance))
        .subscribe((resp) => {
          if (resp) {
            this.router.navigateByUrl('/annual-appraisal');
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
  nextPage() {
    this.router.navigateByUrl('/annual-appraisal');
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
