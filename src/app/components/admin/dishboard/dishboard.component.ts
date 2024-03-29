import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMember } from 'src/app/interface';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignMembersComponent } from '../assign-members/assign-members.component';
import { ComposeEmailComponent } from '../compose-email/compose-email.component';
import { Select, Store } from '@ngxs/store';
import { Company } from 'src/app/store/company/company.action';
import { CompanyModel } from 'src/app/store/company/company.model';
import { CompanyState } from 'src/app/store/company/company.state';
import { Observable, Subject, takeUntil } from 'rxjs';

const ELEMENT_DATA: IMember[] = [];
// const ELEMENT_DATA: IMember[] = [
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
//   {
//     name: 'Hydrogen',
//     position: 'Manager',
//     location: 'Islamabad',
//     status: 'developer',
//     agency: 'OHRM',
//   },
// ];

@Component({
  selector: 'app-dishboard',
  templateUrl: './dishboard.component.html',
  styleUrls: ['./dishboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DishboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  agencyForm: FormGroup;
  displayedColumns: string[] = [
    'name',
    'agency',
    'position',
    'role',
    'location',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<IMember>(ELEMENT_DATA);
  selection = new SelectionModel<IMember>(true, []);

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.agencyForm = this.initForm();
  }
  private unsubscribe$ = new Subject();
  agencySelected = false;
  employeeList: IMember[] = [];
  @Select(CompanyState.agenciesInfo)
  AgenciesList$?: Observable<CompanyModel>;
  selectedAgencyId: number = -1;
  allAgencytList: any[] = [];
  ngOnInit(): void {
    this.agencyFormValue();
    this.subscriptions();
    this.store.dispatch(new Company.GetAll()).subscribe((resp: any) => {});
  }

  agencyFormValue() {
    this.AgencyFormControlName.valueChanges.subscribe((res) => {
      if (res !== '') {
        this.agencySelected = true;
      }
      this.agencyEmployeeList(res);
    });
  }

  agencyEmployeeList(agencyId: number): void {
    this.store
      .dispatch(new Company.GetSingleAgencyEmployee({ id: agencyId }))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        this.dataSource = resp?.company?.agencyemployeeList.map(
          (item: any) => ({
            name: `${item?.firstName} ${item?.lastName}`,
            agency: item?.agency_name || 'N/A',
            position: item?.designation || 'N/A',
            location: item?.location || 'N/A',
            status: item?.status || 'pending',
            managerId: item?.id,
            agencyId: item?.agency,
            role: item?.role
          })
        );
      });
  }

  initForm(): UntypedFormGroup {
    return this.formBuilder.group({
      agency: [''],
    });
  }

  subscriptions(): void {
    if (this.AgenciesList$) {
      this.AgenciesList$.pipe(takeUntil(this.unsubscribe$)).subscribe(
        (agenciesList) => {
          if (Array.isArray(agenciesList) && agenciesList.length) {
            this.allAgencytList = agenciesList;
          }
        }
      );
    }
  }

  openEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  assignMember(data: any): void {
    const dialogRef = this.dialog.open(AssignMembersComponent, {
      data: data,
      width: '600px',
      height: '280px',
      panelClass: 'abc',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  reminderEmail(): void {
    const dialogRef = this.dialog.open(ComposeEmailComponent, {
      width: '900%',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  delete(a: any): void {}

  get AgencyFormControlName(): FormControl {
    return this.agencyForm.get('agency') as FormControl;
  }
}