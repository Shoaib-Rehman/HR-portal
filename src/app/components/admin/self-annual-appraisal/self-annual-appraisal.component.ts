import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
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
  selfAppraisalForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,private store: Store) {
    this.selfAppraisalForm = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): UntypedFormGroup {
    const formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
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
  toggleTextArea(objective: any): void {
    objective.showTextArea = !objective.showTextArea;
  }

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
          score: +(objective.content.score.slice(0, -1)),
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
      let performance: any[] = []
      performance.push({...data, userId:1040})
      this.store
      .dispatch(new Company.lanunchSelfApriasal(performance))
      .subscribe((resp) => {
        console.log('wah g wah',(JSON.stringify(performance))); // Do something with the data, like sending it to a server
        this.router.navigateByUrl('/annualappraisal');
      });
  }  else {
  }
    console.log("ASDSASAD", data)
    
  }

  // setValue(): void {
  //   this.NameFormControl?.setValue('Abdul Majid');
  // }

  selfScoreValue(selfScore: number, score: string, index: number): void {
    score = score.slice(0, -1);
    if (selfScore > +score) {
      this.objectives[index].isValueGreaterThanScore = true; // Show the error message
    } else {
      this.objectives[index].isValueGreaterThanScore = false; // Hide the error message
      this.objectives[index].content.selfScore = selfScore;
    }
  }

  onSubmit() {
    // if (this.selfAppraisalForm.valid) {
    console.log('Name:', this.NameFormControl);
    console.log('Location:', this.LocationFormControl);
    console.log('Position:', this.PositionFormControl);
    // console.log('Date:', this.date.value);
    // You can perform further actions with the form data here
    // } else {
    // Handle invalid form submission
    // }
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
