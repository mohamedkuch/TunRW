import { Component , OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component ({
  selector : 'app-admin',
  templateUrl : './admin.component.html',
  styleUrls : ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '11/12'];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [0, 3, 3, 2, 5, 6, 10], label: 'Projects'},
    {data: [0, 0, 1, 2, 2, 3, 4], label: 'Events'}
  ];
  constructor(private authService: AuthService) { }
  ngOnInit() {
    // Check user Auth
   // this.authService.autoAuthUser();
  }
}
