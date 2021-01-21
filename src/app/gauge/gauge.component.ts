import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {
  RoomData:{
    temperature:string,
    humidity:string,
    brightness:string,
    ledState:string
  }[] = [];

  GaugeData:{
    temperature:string,
    humidity:string,
    brightness:string,
    ledState:string,
    tempVal:string,
    brightVal:string
  }[] = [];

  public canvasWidth = 300;
  public centralLabel = '';
  public optionsTemp = {
      hasNeedle: true,
      needleColor: 'black',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(255,84,84)','rgb(61,204,91)','rgb(239,214,19)'],
      arcDelimiters: [20,70],
      rangeLabel: ['0', '50'],
      needleStartValue: 20,
  }

  public optionsHum = {
    hasNeedle: true,
    needleColor: 'black',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(255,84,84)','rgb(61,204,91)','rgb(239,214,19)'],
    arcDelimiters: [20,80],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  }

  public optionsBright = {
    hasNeedle: true,
    needleColor: 'black',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(255,84,84)','rgb(61,204,91)','rgb(239,214,19)'],
    arcDelimiters: [20,80],
    rangeLabel: ['0', '1024'],
    needleStartValue: 50,
  }
  constructor(private service:SharedService) { }

  ngOnInit(): void {
      this.refreshRoomData();
  }

  refreshRoomData() {
    this.service.getRoomData().subscribe((data:any)=>{
      this.RoomData = data.roomData;

      if (this.RoomData.length !== 0) {
        this.GaugeData =[];
        this.RoomData.map((data:{
          temperature:string,
          humidity:string,
          brightness:string,
          ledState:string
        }) => {
          this.GaugeData.push({
            temperature: data.temperature,
            humidity: data.humidity,
            brightness: data.brightness,
            ledState: data.ledState,
            tempVal: (parseFloat(data.temperature) / 0.5).toFixed(2),
            brightVal: ((1024 - parseInt(data.brightness)) / 10).toString()
          });
        });
      }
    });
  }
}
