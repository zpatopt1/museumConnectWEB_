import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  barChart: any = [];
  lineChart: any = [];
  pieChart: any = [];

  ngOnInit(): void {
    this.createBarChart();
    this.createLineChart();
    this.createPieChart();
  }

  createBarChart() {
    this.barChart = new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'Exemplo de Gráfico de Barras',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createLineChart() {
    this.lineChart = new Chart('lineCanvas', {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'Exemplo de Gráfico de Barras',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }



  createPieChart() {
    this.pieChart = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
                label: 'Exemplo de Gráfico de Pizza',
                data: [30, 20, 50],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
