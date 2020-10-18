import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {SidebarService} from '../../static-elements/service/sidebar.service';
import {SubmissionResultsService} from './service/submission-results.service';
import {ParseService} from '../../../shared/parsers/parse.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-submission-results',
  templateUrl: './submission-results.component.html',
  styleUrls: ['./submission-results.component.css']
})
export class SubmissionResultsComponent implements OnInit {
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
  public barChartLabels: Label[] = ['maj 2020', 'czerwiec 2020', 'lipiec 2020', 'sierpień 2020', 'wrzesień 2020', 'październik 2020', 'listopad 2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 11, 2, 45, 22], label: 'PROBLEMY', backgroundColor: 'rgba(255,0,0,0.3)' },
    { data: [28, 48, 40, 19, 0, 15, 52, 15], label: 'POMYSŁY' , backgroundColor: 'rgba(0,255,0,0.3)' }
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
    { data: [65, 59, 62, 41, 56, 55], label: 'Produkcja' },
    { data: [25, 48, 42, 19, 96, 27], label: 'Magazyn' },
    { data: [18, 41, 32, 12, 41, 2], label: 'Logistyka' },
    { data: [22, 45, 12, 11, 91, 44], label: 'Tłocznia' },
    { data: [21, 23, 0, 33, 22, 21], label: 'Narzędziownia' },
    { data: [22, 5, 15, 22, 96, 13], label: 'Administracja' }

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

  resultsForm: FormGroup;

  areasValid: AbstractControl;
  categoryValid: AbstractControl;
  statusValid: AbstractControl;
  resultsTypeValid: AbstractControl;
  typeValid: AbstractControl;
  dateRangeStartValid: AbstractControl;
  dateRangeEndValid: AbstractControl;

  constructor(public submissionResultsService: SubmissionResultsService,
              private formBuilder: FormBuilder,
              public parseService: ParseService) {

    this.resultsForm = this.formBuilder.group({
      areas: [null],
      category: [null],
      status: [null],
      resultsType: [null],
      type: [null],
      dateRangeStart: [null],
      dateRangeEnd: [this.getLocalDate()]
    });

    this.areasValid = this.resultsForm.controls.areas;
    this.categoryValid = this.resultsForm.controls.category;
    this.statusValid = this.resultsForm.controls.status;
    this.resultsTypeValid = this.resultsForm.controls.resultsType;
    this.typeValid = this.resultsForm.controls.type;
    this.dateRangeStartValid = this.resultsForm.controls.dateRangeStart;
    this.dateRangeEndValid = this.resultsForm.controls.dateRangeEnd;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

  }

  searchFormForceValidAgain(): void {
    this.areasValid.updateValueAndValidity();
    this.categoryValid.updateValueAndValidity();
    this.statusValid.updateValueAndValidity();
    this.resultsTypeValid.updateValueAndValidity();
    this.typeValid.updateValueAndValidity();
    this.dateRangeStartValid.updateValueAndValidity();
    this.dateRangeEndValid.updateValueAndValidity();
  }

  areaArrayPrototype(n: number): any[] {
    return Array(n);
  }

  categoryArrayPrototype(n: number): any[] {
    return Array(n);
  }

  statusArrayPrototype(): any[] {
    const statusArray = Array.from(Array(13).keys());
    statusArray.splice(0, 2); // Bez NOWE_ZGLOSZENIE + EDYCJA
    statusArray.splice(8, 1);
    statusArray.splice(8, 2);
    return statusArray;
  }

  typeArrayPrototype(n: number): any[] {
    return Array(n);
  }

  resultsTypeArrayPrototype(n: number): any[] {
    return Array(n);
  }

  getUTCDate() {
    return new Date().toUTCString();
  }

  getLocalDate() {
    return new Date();
  }

}
