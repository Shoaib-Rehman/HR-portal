import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { IGraph } from 'src/app/interface';
@Component({
  selector: 'app-bell-curve',
  templateUrl: './bell-curve.component.html',
  styleUrls: ['./bell-curve.component.scss'],
})
export class BellCurveComponent implements OnInit {
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

  dataPoints: IGraph[] = [
    { x: 'Inadequate', y: 30 },
    { x: 'Adequate', y: 59 },
    { x: 'Satisfactory', y: 40 },
    { x: 'Good', y: 59 },
    { x: 'Excelent', y: 40 },
  ];

  constructor() {}

  ngOnInit() {
    this.chartData = [
      {
        label: 'Members',
        data: this.dataPoints,
        fill: true,
        borderColor: 'blue',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 1,
      },
    ];
  }
}
