import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMember } from 'src/app/interface';

const ELEMENT_DATA: IMember[] = [
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
  selector: 'app-dishboard',
  templateUrl: './dishboard.component.html',
  styleUrls: ['./dishboard.component.scss'],
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
    'position',
    'location',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<IMember>(ELEMENT_DATA);
  selection = new SelectionModel<IMember>(true, []);

  constructor() {}

  ngOnInit(): void {
    this.statusFormControl.valueChanges.subscribe((status: string) => {
      console.log('changes >> ', status);
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

  edit(a: any): void {}
  delete(a: any): void {}
}
