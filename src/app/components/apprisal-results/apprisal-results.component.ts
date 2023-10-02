import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMember } from 'src/app/interface';
import { Select, Store } from '@ngxs/store';
import { Company } from 'src/app/store/company/company.action';
import { CompanyState } from 'src/app/store/company/company.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

const ELEMENT_DATA: IMember[] = [];
@Component({
  selector: 'app-apprisal-results',
  templateUrl: './apprisal-results.component.html',
  styleUrls: ['./apprisal-results.component.scss'],
})
export class ApprisalResultsComponent implements OnInit {
  @Select(CompanyState.membersDoneAppraisal)
  MemberList$?: Observable<any>;
  employeeList: any = [];
  private unsubscribe$ = new Subject();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'agency',
    'position',
    'location',
    'status',
  ];
  dataSource = new MatTableDataSource<IMember>(ELEMENT_DATA);
  selection = new SelectionModel<IMember>(true, []);

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new Company.getMembers({ isCompleted: true }));
    this.getAllEmployee();
  }

  subscriptions(): void {
    if (this.MemberList$) {
      this.MemberList$.pipe(takeUntil(this.unsubscribe$)).subscribe(
        (agenciesList) => {
          if (Array.isArray(agenciesList) && agenciesList.length) {
            this.employeeList = agenciesList;
          }
        }
      );
    }
  }

  getAllEmployee(): void {
    if (this.MemberList$) {
      this.MemberList$.pipe(takeUntil(this.unsubscribe$)).subscribe(
        (agenciesList) => {
          if (Array.isArray(agenciesList) && agenciesList.length) {
            this.employeeList = agenciesList;
            this.dataSource = this.employeeList.map((item: any) => ({
              name: `${item.firstName} ${item.lastName}`,
              agency: item.agency_name || 'N/A',
              position: item.designation || 'N/A',
              location: item.location || 'N/A',
              status: item.status || 'Pending',
              // agency: item.agency_name || 'N/A',
              id: item?.id,
              agencyId: item?.agency,
              role: item?.role,
            }));
          }
        }
      );
    }

    //  this.MemberList$.subscribe((resp) => {
    //     this.employeeList = resp?.company?.allemployeeList
    //     this.dataSource  = resp?.company?.allemployeeList.map((item:any) => ({
    //       name: `${item.firstName} ${item.lastName}`,
    //       agency: item.agency_name || 'N/A',
    //       position: item.designation || 'N/A',
    //       location: item.location || 'N/A',
    //       status: item.status || 'Pending',
    //     }));

    //   })
  }
  memberApprisal(userData: IMember) {
    this.router.navigateByUrl('/self-appraisal?id=' + userData.id);
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
}
