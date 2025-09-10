import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { expenseService } from '../expense';

@Component({
  selector: 'app-expense-chart',
  standalone: false,
  templateUrl: './expense-chart.html',
  styleUrl: './expense-chart.scss'
})
export class ExpenseChart implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Total Pengeluaran (Rp)' }
    ]
  };

  constructor(private expenseService: expenseService) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    const data = this.expenseService.getExpensesForChartByCategory();
    
    // Perbarui data chart
    this.barChartLabels = data.labels;
    this.barChartData.labels = data.labels;
    this.barChartData.datasets[0].data = data.data;

    this.chart?.update();
  }
}