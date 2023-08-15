import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { DashboardtService } from './dashboardt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isOpen = true;
  public chart: any;
  fundRaised: Array<string> = [];
  week: Array<string> = [];

  constructor(
    private dashboardService: DashboardtService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.fundRaised = this.route.snapshot.data;
    this.DealStats();

    setTimeout(() => {
      this.createChart();
    }, 300);
  }

  getToggleRes() {
    this.isOpen = !this.isOpen;
  }

  DealStats() {
    this.dashboardService.fetchDealStats().subscribe(
      (data: any) => {
        console.log('deal stats :', data);
        data.data.forEach((ele: any) => {
          console.log(
            ele.fundRaisedDaily[0].dateOfWeek,
            ele.fundRaisedDaily[6].dateOfWeek
          );

          this.fundRaised.push(`${ele.fundRaisedWeekly}`);
          // this.week.push(`${ele._id.year},Week-${ele._id.week}`);
          this.week.push(
            `${ele.fundRaisedDaily[0].dateOfWeek} - ${ele.fundRaisedDaily[6].dateOfWeek}`
          );
        });
        console.log(this.fundRaised, this.week);
      },
      (error) => {
        console.log('error from deal stats :', error);
      }
    );
  }

  createChart() {
    console.log('chart', this.fundRaised);

    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {
        // values on X-Axis
        labels: this.week,
        datasets: [
          {
            label: 'Fund Raised ₹',
            data: this.fundRaised,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }
}
