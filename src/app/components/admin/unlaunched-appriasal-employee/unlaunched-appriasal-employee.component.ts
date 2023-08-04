import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMember } from 'src/app/interface';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

const ELEMENT_DATA: IMember[] = [
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'HR',
  location: 'Islamabad',
  status: 'Pending',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
{
  name: 'Hydrogen',
  position: 'Manager',
  location: 'Islamabad',
  status: 'developer',
},
];
@Component({
  selector: 'app-unlaunched-appriasal-employee',
  templateUrl: './unlaunched-appriasal-employee.component.html',
  styleUrls: ['./unlaunched-appriasal-employee.component.scss']
})

export class UnlaunchedAppriasalEmployeeComponent implements OnInit {

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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.statusFormControl.valueChanges.subscribe((status: string) => {
      console.log('changes >> ', status);
    });
  }

  openEmployeeModal(element:any): void {
    console.log(element)
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data:element,
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



