import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../static-elements/service/sidebar.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ChartOptions, ChartType, ChartDataSets, RadialChartOptions} from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'authenticated-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {


  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        font: {
          size: 18,
          weight: 'bold',
          }
        },
      },
    };

  public barChartLabels: Label[] = ['maj 2020', 'czerwiec 2020', 'lipiec 2020', 'sierpień 2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'PROBLEMY', backgroundColor: 'rgba(255,0,0,0.3)' },
    { data: [28, 48, 40, 19], label: 'POMYSŁY' , backgroundColor: 'rgba(0,255,0,0.3)' }
  ];


  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'left',
      labels: {
        fontSize: 15,
        padding: 10,
        fontStyle: 'bold'
      }
    },
    plugins: {
      datalabels: {
        display: false,
      }
    }
  };
  public radarChartLabels: Label[] = ['ZGŁOSZONY', 'DO POPRAWY', 'ZATWIERDZONY LIDER', 'ZATWIERDZONY KIEROWNIK', 'WDROŻONY', 'ODRZUCONY'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 62, 41, 56, 55], label: 'ACS 5/6k - Produkcja' },
    { data: [25, 48, 42, 19, 96, 27], label: 'ACS 5/6k - Testy' },
    { data: [18, 41, 32, 12, 41, 2], label: 'ACS 2000 - Produkcja' },
    { data: [22, 45, 12, 11, 91, 44], label: 'ACS 2000 - Testy' },
    { data: [21, 23, 0, 33, 22, 21], label: 'ACS 6000 - Produkcja' },
    { data: [22, 5, 15, 22, 96, 13], label: 'ACS 6000 - Testy' }

  ];
  public radarChartType: ChartType = 'radar';

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex] + ctx.ch;
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['DRIVES', 'SYSTEM'], ['DC', 'DRIVES'], 'TRACTION', 'DC TPS', ['EXCITATION', 'SYSTEMS'], 'MAGAZYN', 'ADMINISTRACJA'];
  public pieChartData: number[] = [12, 22, 18, 28, 10, 5, 15];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,244,255,0.3)', 'rgba(22,155,255,0.3)', 'rgba(180,0,210,0.3)', 'rgba(160,210,22,0.3)'],
    },
  ];

  constructor(private sidebarService: SidebarService) {

  }

  ngOnInit(): void {
  }


}
