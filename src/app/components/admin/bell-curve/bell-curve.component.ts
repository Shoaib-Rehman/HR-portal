import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-bell-curve',
  templateUrl: './bell-curve.component.html',
  styleUrls: ['./bell-curve.component.scss']
})
export class BellCurveComponent implements OnInit {

  constructor() { }

  chartType: ChartType = 'line';
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 100,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        ticks: {
          stepSize: 10
        }
      },
      y: {
        display: false
      }
    } as any,
    elements: {
      line: {
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        tension: 0.4,
        borderWidth: 2,
        // fill: '-1'
      }
    } as any
  };
  
  ngOnInit() {
    this.chartLabels = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
    
    const dataPoints = [0, 0.4, 0.69, 0.9, 0.9, 0.86, 0.7, 0.6, 0.5, 0];
    
    this.chartData = [
      { data: dataPoints, label: 'Bell Curve' },
      { data: [0, 1], label: 'Vertical Line', fill: false, borderColor: 'black', borderWidth: 2 }
    ];
  }
}
