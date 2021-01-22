import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {Router} from "@angular/router";
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  tokenExist:boolean;
  selectedDate:Date;
  maxRoomNum:number = 3;
  tempMsgs:any = [];
  isLoading:boolean;

  constructor(private service:SharedService, private router: Router) { }

  toogleDataSeries = (e) => {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    };

    var date = new Date();
    this.selectedDate = date;

    this.onChangeDate();
  }

  onChangeDate() {
    this.isLoading = true;
    this.service.getTempData(this.selectedDate).subscribe((data:any)=>{
      this.tempMsgs = data.tempMsgs;
      this.isLoading = false;
      this.drawChart();
    });
  }

  drawChart() {        
    var tempDataPoints = [];
    var splits;

    for (let i = 0; i < this.maxRoomNum; i++) {
        tempDataPoints[i] = [];
        // UTC -> Local Time
        for (var tempMsg of this.tempMsgs) {
            splits = tempMsg.topic.split('/');
            if (splits[1] === `room${i+1}`) {
                tempDataPoints[i].push({
                    x: new Date(tempMsg.date),
                    y: parseFloat(tempMsg.value)
                });
            }
        }
    }

    var dataPtrs = [];
    const colorTable = ['blue', 'red', 'green', 'black', 'orange'];
    for (let i = 0; i < this.maxRoomNum; i++) {
        dataPtrs.push({
            type: "line",
            showInLegend: true,
            name: `Room${i+1}`,
            markerType: "square",
            xValueFormatString: "HH:mm",
            color: colorTable[i],
            //lineDashType: "dash",
            yValueFormatString: "#,##0",
            dataPoints: tempDataPoints[i]
        });
    }

    const options = {
			animationEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: `Room Temperature (${this.selectedDate.getMonth()-1}/${this.selectedDate.getDate()}/${this.selectedDate.getFullYear()})`
			},
			axisY: {
                title: "Degree",
                suffix: " C",
                minimum: 0
			},
			axisX: {
				valueFormatString: "HH:mm"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "bottom",
                horizontalAlign: "left",
                dockInsidePlotArea: true,
                itemclick: this.toogleDataSeries
            },
            data: dataPtrs
    }
    
    let chart = new CanvasJS.Chart("chartContainer", options);
      
    chart.render();
  }
}
