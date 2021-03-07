import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {SidebarService} from '../../static-elements/service/sidebar.service';
import {SubmissionResultsService} from './service/submission-results.service';
import {ParseService} from '../../../shared/parsers/parse.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import * as Chart from 'chart.js';
import {ArraysService} from '../../../shared/parsers/arrays.service';
import {SessionService} from '../../../shared/services/session.service';


@Component({
  selector: 'app-submission-results',
  templateUrl: './submission-results.component.html',
  styleUrls: ['./submission-results.component.css']
})

export class SubmissionResultsComponent implements AfterViewInit, OnInit, OnDestroy {

  chartContainer;

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
              public sessionService: SessionService,
              public parseService: ParseService,
              public arraysService: ArraysService) {

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

  ngAfterViewInit(){
    this.chartContainer = document.getElementById("chartContainer");
    this.loadChart();
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

  loadChart() {
    const myChart = new Chart(this.chartContainer, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  getUTCDate() {
    return new Date().toUTCString();
  }

  getLocalDate() {
    return new Date();
  }

}
