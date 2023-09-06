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
import { Observable, Subject, takeUntil } from 'rxjs';
import { Company } from 'src/app/store/company/company.action';
import { IUser } from 'src/app/store/company/company.interface';
import { CompanyModel } from 'src/app/store/company/company.model';
import { CompanyState } from 'src/app/store/company/company.state';

@Component({
  selector: 'app-next-year-objectives',
  templateUrl: './next-year-objectives.component.html',
  styleUrls: ['./next-year-objectives.component.scss'],
})
export class NextYearObjectivesComponent implements OnInit, OnDestroy {
  @Select(CompanyState.userdetails)
  userdetails$?: Observable<CompanyModel>;
  userDetails?: IUser;
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
  disable: boolean = false;
  data: any;
  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.nextYearForm = this.initForm();
  }
  ngOnInit(): void {
    this.apprisalDetail();
  }

  apprisalDetail(): void {
    this.userdetails$?.subscribe((resp: any) => {
      if (resp) {
        this.userDetails = resp;
        this.setValueDisableConrols(resp);
        this.store
          .dispatch(new Company.GetNextYearApriasal(this.userDetails?.id))
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((resp) => {
            if (resp.company.ApprisalDetails.length) {
              this.submittedNextYearAppriasalData =
                resp.company.ApprisalDetails;
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
              if (this.data['kpi__1'] !== '' || this.data['kpi__1'] !== null) {
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
      performance.push({ ...data, userId: this.userDetails?.id });
      this.store
        .dispatch(new Company.launchNextYearApriasal(performance))
        .subscribe((resp) => {
          if (resp) {
            this.apprisalDetail();
          }
        });
    } 
  }
  backPage() {
    this.router.navigateByUrl('/annual-appraisal');
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
