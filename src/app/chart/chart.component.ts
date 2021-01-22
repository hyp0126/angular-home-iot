import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  tokenExist:boolean;

  constructor(private service:SharedService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    };
  }

}
