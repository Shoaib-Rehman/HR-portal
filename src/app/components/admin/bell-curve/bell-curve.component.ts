import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable, Subscription } from 'rxjs';
import { MEMBER_CATEGORY } from 'src/app/constant';
import { IAgency, ICategory, IGraph, IMember } from 'src/app/interface';
import { Company } from 'src/app/store/company/company.action';
import { CompanyState } from 'src/app/store/company/company.state';
@Component({
  selector: 'app-bell-curve',
  templateUrl: './bell-curve.component.html',
  styleUrls: ['./bell-curve.component.scss'],
})
export class BellCurveComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(CompanyState.GetAllMemberWhoDoneApprisal)
  members$?: Observable<IMember[]>;

  @Select(CompanyState.agenciesInfo)
  agencyList$?: Observable<IAgency[]>;

  agency: FormControl = new FormControl();
  agencySubscription?: Subscription;
  chartType: ChartType = 'bar';
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [
    'Inadequate',
    'Adequate',
    'Satisfactory',
    'Good',
    'Excelent',
  ];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      // xAxes: [
      //   {
      //     borderColor: 'blue',
      //     backgroundColor: 'rgba(0, 0, 255, 0.3)',
      //   },
      // ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    } as any,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    } as any,
  };

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new Company.GetAll());

    this.agencyList$?.subscribe((agencies: IAgency[]) => {
      const firstMember: number = agencies[0]?.id as number;
      this.agency.setValue(firstMember);
      this.store.dispatch(new Company.GetAllMemberWhoDoneApprisal(firstMember));
    });

    this.createChart();
  }

  ngAfterViewInit(): void {
    this.agencySubscription = this.agency.valueChanges.subscribe(
      (agencyId: number) => {
        this.store
          .dispatch(new Company.GetAllMemberWhoDoneApprisal(agencyId))
          .subscribe();
      }
    );
  }

  createChart(): void {
    this.members$?.subscribe((members: IMember[]) => {
      this.chartData = [
        {
          label: 'Members',
          data: this.calculateGraphData(members),
          fill: true,
          borderColor: 'blue',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderWidth: 1,
        },
      ];
    });
  }

  calculateGraphData(members: IMember[]): IGraph[] {
    const membersCategory: ICategory = {
      inadequate: 0,
      adequate: 0,
      satisfactory: 0,
      good: 0,
      excelent: 0,
    };
    members.reduce((numOfMembers: ICategory, member: IMember) => {
      if (member.status === MEMBER_CATEGORY.INADEQUATE) {
        numOfMembers.inadequate++;
      }
      if (member.status === MEMBER_CATEGORY.ADEQUATE) {
        numOfMembers.adequate++;
      }
      if (member.status === MEMBER_CATEGORY.SATISFACTORY) {
        numOfMembers.satisfactory++;
      }
      if (member.status === MEMBER_CATEGORY.GOOD) {
        numOfMembers.good++;
      }
      if (member.status === MEMBER_CATEGORY.EXCELENT) {
        numOfMembers.excelent++;
      }
      return numOfMembers;
    }, membersCategory);
    return [
      { x: 'Inadequate', y: membersCategory.inadequate },
      { x: 'Adequate', y: membersCategory.adequate },
      { x: 'Satisfactory', y: membersCategory.satisfactory },
      { x: 'Good', y: membersCategory.good },
      { x: 'Excelent', y: membersCategory.excelent },
    ];
  }

  ngOnDestroy(): void {
    if (this.agencySubscription) {
      this.agencySubscription.unsubscribe();
    }
  }
}
