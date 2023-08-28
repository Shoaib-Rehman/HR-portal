import { IAddEmployee } from 'src/app/interface';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ILaunchAppraisal } from 'src/app/interface';
import { ComposeEmailComponent } from '../compose-email/compose-email.component';
import { Select, Store } from '@ngxs/store';
import { CompanyState } from 'src/app/store/company/company.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Company } from 'src/app/store/company/company.action';
import { CompanyModel } from 'src/app/store/company/company.model';

@Component({
  selector: 'app-launch-appriasal',
  templateUrl: './launch-appriasal.component.html',
  styleUrls: ['./launch-appriasal.component.scss'],
})
export class LaunchAppriasalComponent implements OnInit {
  @Select(CompanyState.agenciesInfo)
  AgenciesList$?: Observable<any>;

  @Select(CompanyState.agencyEmployees)
  AgencyEmployeeList$?: Observable<any>

  @Select(CompanyState.allEmployees)
  AllEmployeeList$?: Observable<any>

  appraisalForm: FormGroup;
  isIndividualAppraisal: boolean = false;
  isCompanyAppraisal: boolean = false;
  currentTime: Date = new Date();
  employeeList:IAddEmployee[] = [];
  private unsubscribe$ = new Subject();
  // allAgencytList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private store: Store
  ) {
    this.appraisalForm = this.initForm();
  }

  ngOnInit(): void {
    this.agencyList();
    // this.Searchemployee()
  }

  initForm(): UntypedFormGroup {
    const formGroup = this.formBuilder.group({
      year: [''],
      appraisalType: ['', Validators.required],
      employee: [''],
      company: [''],
    });
    this.disableFormControl(formGroup);
    return formGroup;
  }

  agencyList(): void {
    this.store.dispatch(new Company.GetAll());
 
  }

  // filterList(resp: string):any {
  //   return this.employeeList.filter((res:any) => res?.firstName.toLocaleLowerCase()?.includes(resp.toLocaleLowerCase()));
  // }
  // Searchemployee() {
  //   this.employeeFromControl.valueChanges.subscribe((resp: string) => {
  //     console.log("RESSSSSS",resp)
  //       this.employeeList = this.filterList(resp);
       
  //   })
  // }

  disableFormControl(formGroup: UntypedFormGroup): void {
    formGroup.get('year')?.disable();
    formGroup.get('year')?.setValue(this.currentTime.getFullYear());
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.appraisalForm.get(field);
    return (
      (formControl?.invalid && (formControl?.touched || formControl?.dirty)) ||
      true
    );
  }

  onAppraisalTypeChange(selectedType: string): void {
    this.clearValidator();
    this.isIndividualAppraisal = selectedType === 'individual';
    this.isCompanyAppraisal = selectedType === 'company';
    if (this.isCompanyAppraisal) {
      this.companyFromControl.setValue('');
      this.employeeFromControl.setValue('');
    }
    if (this.isIndividualAppraisal) {
      this.companyFromControl.setValue('');
      this.employeeFromControl.setValue('');
      // ************** remove *******
      this.store.dispatch(new Company.GetAllEmployee).subscribe((resp) => {
        console.log("Agency employee Launch Apprisail >>>>>> ", resp?.company?.allemployeeList)
        this.employeeList = resp?.company?.allemployeeList
      })
      // ***************
    }
  }

  isCompanySelected(): boolean {
    if (this.isIndividualAppraisal && this.companyFromControl.value === '') {
      return true;
    } else if (this.isCompanyAppraisal) {
      return false;
    }
    return false;
  }


  selectedAgencyEmployeeList(agencyId:number): void {
    this.store
    .dispatch(new Company.GetSingleAgencyEmployee({ id: agencyId }))
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      this.employeeList = resp?.company?.agencyemployeeList;
    })
  }

  onSubmit(): void {
    this.formValidator();
    if (this.appraisalForm.valid) {
      const formData: ILaunchAppraisal = this.prepareFormData();
      console.log('appraisalForm formData >>', formData);
      const dialogRef = this.dialog.open(ComposeEmailComponent, {
        data: formData,
        width: '900%',
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed', result);
      });
    } else {
      console.log('appraisalForm >>', this.appraisalForm.value);
      // handling error;
      this.appraisalForm.markAllAsTouched();
    }
  }

  private prepareFormData(): ILaunchAppraisal {
    const formData = { ...this.appraisalForm.getRawValue() };
    return formData;
  }

  formValidator(): void {
    this.companyFromControl.setValidators([Validators.required]);
    this.companyFromControl.updateValueAndValidity();
    if (this.isCompanyAppraisal) {
      this.employeeFromControl?.setValue('');
      this.employeeFromControl.clearValidators();
      this.employeeFromControl.updateValueAndValidity();
    } else {
      this.employeeFromControl.setValidators([Validators.required]);
      this.employeeFromControl.updateValueAndValidity();
    }
  }

  clearValidator(): void {
    this.employeeFromControl.clearValidators();
    this.employeeFromControl.updateValueAndValidity();
    this.companyFromControl.clearValidators();
    this.companyFromControl.updateValueAndValidity();
  }

  get employeeFromControl(): FormControl {
    return this.appraisalForm.get('employee') as FormControl;
  }
  get companyFromControl(): FormControl {
    return this.appraisalForm.get('company') as FormControl;
  }
}
