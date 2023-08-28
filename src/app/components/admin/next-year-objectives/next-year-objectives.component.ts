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
  selector: 'app-next-year-objectives',
  templateUrl: './next-year-objectives.component.html',
  styleUrls: ['./next-year-objectives.component.scss'],
})
export class NextYearObjectivesComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.nextYearForm = this.initForm();
  }
  ngOnInit(): void {
    this.getSelfApriasalData();
    this.setValueDisableConrols();
  }

  getSelfApriasalData(): void {
    //change userId 2
    this.store.dispatch(new Company.GetSelfApriasal(1)).subscribe((resp) => {
      if (resp.company.employeeSelfApprisalDetails.length) {
        this.submittedNextYearAppriasalData =
          resp.company.employeeSelfApprisalDetails;
        this.data = this.submittedNextYearAppriasalData[0];
        for (let i = 1; i <= 4; i++) {
          this.objectives[i - 1].content.objective =
            this.data[`objective_${i}`];
          this.objectives[i - 1].content.keyPerformanceIndicators =
            this.data[`kpi_${i}`];
          // this.objectives[i - 1].content.actualPerformance =
          //   this.data[`actual_performance_${i}`];
          this.objectives[i - 1].content.score = `${this.data[`score_${i}`]}%`;
          // this.objectives[i - 1].content.selfScore =
          //   this.data[`self_socre_${i}`];
          // this.objectives[i - 1].content.managerScore =
          //   this.data[`manager_score_${i}`];
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
        objective.content.keyPerformanceIndicators
      ) {
        return {
          objective: objective.content.objective,
          KeyPerformanceIndicators: objective.content.keyPerformanceIndicators,
          actualPerformance: objective.content.actualPerformance,
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
      performance.push({ ...data, userId: 1040 }); // change userId
      this.store
        .dispatch(new Company.lanunchSelfApriasal(performance))
        .subscribe((resp) => {
          if (resp) {
            // this.router.navigateByUrl('/annual-appraisal');
          }
        });
    } else {
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
}
