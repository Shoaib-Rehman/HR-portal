import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMember } from 'src/app/interface';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignMembersComponent } from '../assign-members/assign-members.component';
import { ComposeEmailComponent } from '../compose-email/compose-email.component';

const ELEMENT_DATA: IMember[] = [
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
  {
    name: 'Hydrogen',
    position: 'Manager',
    location: 'Islamabad',
    status: 'developer',
    agency: 'OHRM',
  },
];

@Component({
  selector: 'app-dishboard',
  templateUrl: './dishboard.component.html',
  styleUrls: ['./dishboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DishboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  statusFormControl: FormControl = new FormControl('steak-0');

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  displayedColumns: string[] = [
    'name',
    'agency',
    'position',
    'location',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<IMember>(ELEMENT_DATA);
  selection = new SelectionModel<IMember>(true, []);

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.statusFormControl.valueChanges.subscribe((status: string) => {
      console.log('changes >> ', status);
    });
  }

  openEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {

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

  assignMember(): void {
    const dialogRef = this.dialog.open(AssignMembersComponent, {
      width: '600px',
      height: '280px',
      panelClass:'abc'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }


  reminderEmail() :void {
    const dialogRef = this.dialog.open(ComposeEmailComponent, {
      width: '900%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
  delete(a: any): void { }


}
