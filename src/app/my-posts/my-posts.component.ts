import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PostsService } from '../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss',
})
export class MyPostsComponent {
  posts: any = [];

  constructor(private postsService: PostsService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
  }

  chartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'YYYY-MM-DD',
            displayFormats: {
              day: 'YYYY-MM-DD',
            },
          },
          ticks: {
            source: 'labels',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  chartData = [
    {
      data: [
        { x: '2024-06-15', y: 16 },
        { x: '2024-06-10', y: 32 },
      ],
      label: 'Transaction Stats',
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ];

  // chartLabels = ['2023-06-15', '2023-06-10'];

  barChartData = {
    // label: this.chartLabels,
    datasets: [
      {
        label: 'Transaction Stats',
        data: [
          { x: '2024-06-15', y: 16 },
          { x: '2024-06-17', y: 32 },
          { x: '2024-06-20', y: 44 },
          { x: '2024-06-22', y: 65 },
          { x: '2024-06-30', y: 71 },
        ],
        fill: true,

        backgroundColor: 'rgba(219, 234, 254,0.5)',
        borderColor: '#2563eb',
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  // chartColors = [
  //   {
  //     backgroundColor: 'rgba(153, 102, 255, 0.2)',
  //     borderColor: 'rgba(153, 102, 255, 1)',
  //     borderWidth: 1
  //   }
  // ];

  chartLegend = false;
  chartType: ChartType = 'line';
  chartPlugins = [];
}
