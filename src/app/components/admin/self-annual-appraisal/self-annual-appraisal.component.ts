import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-self-annual-appraisal',
  templateUrl: './self-annual-appraisal.component.html',
  styleUrls: ['./self-annual-appraisal.component.scss'],
})
export class SelfAnnualAppraisalComponent implements OnInit {
  selfAppraisalForm: FormGroup;
  dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  score = [
    { value: '10%', label: '10%' },
    { value: '20%', label: '20%'},
    { value: '30%', label: '30%' },
    { value: '40%', label: '40%' },
    { value: '50%', label: '50%' },
    { value: '60%', label: '60%' },
    { value: '70%', label: '70%' },
    { value: '80%', label: '80%' },
    { value: '90%', label: '90%' },
    { value: '100%', label:'100%' },
  ];
  constructor(private formBuilder: FormBuilder) {
    this.selfAppraisalForm = this.initForm()
  }

  ngOnInit(): void {}

  initForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
    });
  
  }
  toggleTextArea(objective: any): void {
    objective.showTextArea = !objective.showTextArea;
  }

  objectives: any[] = [
    {
      name: 'Objective 1',
      expanded: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '',
        selfScore:'',
        managerScore:''
      },
    },
    {
      name: 'Objective 2',
      expanded: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '40%',
        selfScore:'',
        managerScore:''
      },
    },
    {
      name: 'Objective 3',
      expanded: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: '',
        score: '40%',
        selfScore:'',
        managerScore:''
      },
    },
  ];

  toggleObjective(index: number): void {
    this.objectives[index].expanded = !this.objectives[index].expanded;
  }

  isExpanded(index: number): boolean {
    return this.objectives[index].expanded;
  }

  saveData() {
    const data: any = this.objectives.map((objective) => {
      return {
        objective: objective.content.objective,
        keyPerformanceIndicators: objective.content.keyPerformanceIndicators,
        actualPerformance: objective.content.actualPerformance,
        score: objective.content.score,
        selfScoor:objective.content.selfScore,
        managerScoor:objective.content.managerScore
      };
    });

    console.log(data); // Do something with the data, like sending it to a server
  }

  setValue(): void {
    this.NameFormControl?.setValue('Abdul Majid');
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