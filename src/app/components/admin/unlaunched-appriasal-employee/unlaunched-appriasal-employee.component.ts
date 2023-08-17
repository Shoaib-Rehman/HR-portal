import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMember } from 'src/app/interface';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Store } from '@ngxs/store';
import { CompanyModel } from 'src/app/store/company/company.model';
import { Company } from 'src/app/store/company/company.action';


const ELEMENT_DATA: IMember[] = []

// const ELEMENT_DATA: IMember[] = [
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'HR',
//   location: 'Islamabad',
//   status: 'Pending',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// {
//   name: 'Hydrogen',
//   position: 'Manager',
//   location: 'Islamabad',
//   status: 'developer',
// },
// ];
@Component({
  selector: 'app-unlaunched-appriasal-employee',
  templateUrl: './unlaunched-appriasal-employee.component.html',
  styleUrls: ['./unlaunched-appriasal-employee.component.scss']
})

export class UnlaunchedAppriasalEmployeeComponent implements OnInit {
employeeList: IMember[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  statusFormControl: FormControl = new FormControl('steak-0');

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  displayedColumns: string[] = [
    'name',
    'position',
    'location',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<IMember>(ELEMENT_DATA);
  selection = new SelectionModel<IMember>(true, []);

  constructor(private dialog: MatDialog, private store:Store) {}

  ngOnInit(): void {
    this.statusFormControl.valueChanges.subscribe((status: string) => {
      console.log('changes >> ', status);
    });
    this.store.dispatch(new Company.GetAllEmployee).subscribe((resp) => {
      console.log("All Employee >>>>>> ", resp?.company?.employeeList)
      this.employeeList = resp?.company?.employeeList
      // this.dataSource = resp?.company?.employeeList
      this.dataSource  = resp?.company?.employeeList.map((item:any) => ({
        name: `${item.firstName} ${item.lastName}`,
        position: item.designation || 'HR',
        location: item.location || 'Islamabad',
        status: item.status || 'Pending',
      }));
      
    })
  }

  

  openEmployeeModal(element:IMember, index:any): void {
    console.log("Element>>>>>>>>>>>>>>>",element)
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data:this.employeeList[index],
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
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

  delete(a: any): void {}
}



