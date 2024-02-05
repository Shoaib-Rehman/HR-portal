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
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

const ELEMENT_DATA: IMember[] = [];

@Component({
  selector: 'app-assign-members-list',
  templateUrl: './assign-members-list.component.html',
  styleUrls: ['./assign-members-list.component.scss'],
})
export class AssignMembersListComponent implements OnInit {
  employeeList: IMember[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  memberApprisal(userData: IMember) {
    this.router.navigateByUrl('/self-appraisal?id=' + userData.id);
  }
  // assignmembersToManger(): void {

  //   this.store
  //     .dispatch(
  //       new Company.getMembers({
  //         agencyId: this.localStorage?.User?.id,
  //         managerId: this.localStorage?.User?.id,
  //       })
  //     )
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((resp) => {
  //       this.users = resp?.company?.managerEmployeeList;
  //     });
  // }

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
    this.store
      .dispatch(
        new Company.getMembers({
          agencyId: this.localStorage?.User?.agency,
          managerId: this.localStorage?.User?.id,
          status: 'doneByMember',
        })
      )
      .subscribe((resp) => {
        this.employeeList = resp?.company?.managerEmployeeList;
        this.dataSource = resp?.company?.managerEmployeeList.map(
          (item: any) => ({
            name: `${item.firstName} ${item.lastName}`,
            position: item.designation || 'N/A',
            location: item.location || 'N/A',
            status: item.status || 'Pending',
            agency: item.agency_name || 'N/A',
            id: item?.id,
            agencyId: item?.agency,
            role: item?.role,
          })
        );
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
