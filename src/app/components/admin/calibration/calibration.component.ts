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

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.scss']
})
export class CalibrationComponent implements OnInit {

  employeeList: IMember[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'Excellent',
    'Good',
    'Satisfactory',
    'Adequate',
    'InAdequate',
  ];
  dataSource = new MatTableDataSource<IMember>(ELEMENT_DATA);
  selection = new SelectionModel<IMember>(true, []);

  constructor(private dialog: MatDialog, private store:Store) {}

  ngOnInit(): void {
    this.getAllEmployee()

  }

  

  openEmployeeModal(element:IMember, index:any): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data:this.employeeList[index],
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.data) {
        this.getAllEmployee()
      }
    });
  }

  getAllEmployee(): void {
    this.store.dispatch(new Company.GetAllEmployee).subscribe((resp) => {
      this.employeeList = resp?.company?.allemployeeList
      this.dataSource  = resp?.company?.allemployeeList.map((item:any) => ({
        Excellent: `${item.firstName} ${item.lastName}`,
        Good: item.agency_name || 'N/A',
        Satisfactory: item.designation || 'N/A',
        Adequate: item.location || 'N/A',
        InAdequate: item.status || 'Pending',
      }));
      
    })
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
