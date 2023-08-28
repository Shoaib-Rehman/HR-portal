import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Company } from 'src/app/store/company/company.action';

@Component({
  selector: 'app-self-annual-appraisal',
  templateUrl: './self-annual-appraisal.component.html',
  styleUrls: ['./self-annual-appraisal.component.scss'],
})
export class SelfAnnualAppraisalComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.selfAppraisalForm = this.initForm();
    debugger
  }
  ngOnInit(): void {
    this.getSelfApriasalData();
    this.setValueDisableConrols();
  }

  getSelfApriasalData(): void {
    //change userId 2
    this.store.dispatch(new Company.GetSelfApriasal(1040)).subscribe((resp) => {
      if (resp.company.employeeSelfApprisalDetails.length) {
        this.submittedSelfAppriasalData =
          resp.company.employeeSelfApprisalDetails;
        this.data = this.submittedSelfAppriasalData[0];
        for (let i = 1; i <= 4; i++) {
          this.objectives[i - 1].content.objective =
            this.data[`objective_${i}`];
          this.objectives[i - 1].content.keyPerformanceIndicators =
            this.data[`kpi_${i}`];
          this.objectives[i - 1].content.actualPerformance =
            this.data[`actual_performance_${i}`];
          this.objectives[i - 1].content.score = `${this.data[`score_${i}`]}%`;
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

  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  setValueDisableConrols() {
    this.NameFormControl?.disable();
    this.NameFormControl?.setValue('Majid');

    this.LocationFormControl?.disable();
    this.LocationFormControl?.setValue('Canada');

    this.PositionFormControl?.disable();
    this.PositionFormControl?.setValue('Member');

    this.DateFormControl?.disable();
    this.DateFormControl?.setValue('2023-2024');
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
      performance.push({ ...data, userId: 1040 }); // change userId
      this.store
        .dispatch(new Company.lanunchSelfApriasal(performance))
        .subscribe((resp) => {
          if (resp) {
            this.router.navigateByUrl('/annual-appraisal?id=1040');
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
}
