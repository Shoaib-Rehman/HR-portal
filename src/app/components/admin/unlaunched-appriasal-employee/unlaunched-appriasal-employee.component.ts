import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMember } from 'src/app/interface';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Store } from '@ngxs/store';
import { Company } from 'src/app/store/company/company.action';
import { MEMBER_STATUSES } from 'src/app/constant';
import { MatSelectChange } from '@angular/material/select';

const ELEMENT_DATA: IMember[] = [];
@Component({
  selector: 'app-unlaunched-appriasal-employee',
  templateUrl: './unlaunched-appriasal-employee.component.html',
  styleUrls: ['./unlaunched-appriasal-employee.component.scss'],
})
export class UnlaunchedAppriasalEmployeeComponent implements OnInit {
  employeeList: IMember[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  memberStatuses = MEMBER_STATUSES;

  displayedColumns: string[] = [
    'name',
    'agency',
    'position',
    'location',
    'status',
    'change_status',
    'actions',
  ];
  dataSource = new MatTableDataSource<IMember>(ELEMENT_DATA);
  selection = new SelectionModel<IMember>(true, []);

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  openEmployeeModal(element: IMember, index: any): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: this.employeeList[index],
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.getAllEmployee();
      }
    });
  }

  getAllEmployee(): void {
    this.store.dispatch(new Company.GetAllEmployee()).subscribe((resp) => {
      this.employeeList = resp?.company?.allemployeeList;
      this.dataSource = resp?.company?.allemployeeList.map((item: any) => ({
        name: `${item.firstName} ${item.lastName}`,
        agency: item.agency_name || 'N/A',
        position: item.designation || 'N/A',
        location: item.location || 'N/A',
        status: item.status || 'Pending',
        change_status: item.status,
        id: item.id,
      }));
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

  changeMemberStatus(status: MatSelectChange, member: IMember): void {
    console.log('Member > ', member);
    console.log('status > ', status);
  }

  delete(a: any): void {}
}
