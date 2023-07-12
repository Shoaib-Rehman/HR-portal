import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-self-annual-appraisal',
  templateUrl: './self-annual-appraisal.component.html',
  styleUrls: ['./self-annual-appraisal.component.scss'],
})
export class SelfAnnualAppraisalComponent implements OnInit {
  myForm: FormGroup;
  dropdownOptions  = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  selectedOption: string | undefined;

  // role based competendense work ****************
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

  isSelected(category: string, boxNumber: number): boolean {
    return (
      boxNumber === this.selectedBoxes[category] ||
      boxNumber < this.selectedBoxes[category]
    );
  }

  selectBox(category: string, boxNumber: number): void {
    this.selectedBoxes[category] = boxNumber;
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
  // ****************************************************************
  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
      selfScoor: ['', Validators.required],
      scoor: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    
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
        actualPerformance: ''
      }
    },
    { 
      name: 'Objective 2',
      expanded: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: ''
      }
    },
    { 
      name: 'Objective 3',
      expanded: false,
      content: {
        objective: '',
        keyPerformanceIndicators: '',
        actualPerformance: ''
      }
    }
  ];

  toggleObjective(index: number): void {
    this.objectives[index].expanded = !this.objectives[index].expanded;
  }

  isExpanded(index: number): boolean {
    return this.objectives[index].expanded;
  }


  saveData() {
    const data:any = this.objectives.map(objective => {
      return {
        objective: objective.content.objective,
        keyPerformanceIndicators: objective.content.keyPerformanceIndicators,
        actualPerformance: objective.content.actualPerformance
      };
    });

    console.log(data); // Do something with the data, like sending it to a server
  }



  
  get NameFormControl() {
    return this.myForm.get('name');
  }

  get location() {
    return this.myForm.get('location');
  }

  get position() {
    return this.myForm.get('position');
  }

  get date() {
    return this.myForm.get('date');
  }

  onSubmit() {
    // if (this.myForm.valid) {
      console.log('Name:', this.NameFormControl);
      console.log('Location:', this.location);
      console.log('Position:', this.position);
      // console.log('Date:', this.date.value);
      // You can perform further actions with the form data here
    // } else {
      // Handle invalid form submission
    // }
  }
  
}
