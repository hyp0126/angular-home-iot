import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit, OnDestroy {
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
    brightVal:string,
    ledVal:boolean
  }[] = [];

  public canvasWidth = 250;
  public centralLabel = '';
  public optionsTemp = {
    hasNeedle: true,
    needleColor: 'black',
    needleUpdateSpeed: 1,
    arcColors: ['rgb(255,84,84)','rgb(61,204,91)','rgb(239,214,19)'],
    arcDelimiters: [20,70],
    rangeLabel: ['0', '50'],
    needleStartValue: 50,
  }

  public optionsHum = {
    hasNeedle: true,
    needleColor: 'black',
    needleUpdateSpeed: 1,
    arcColors: ['rgb(255,84,84)','rgb(61,204,91)','rgb(239,214,19)'],
    arcDelimiters: [20,80],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  }

  public optionsBright = {
    hasNeedle: true,
    needleColor: 'black',
    needleUpdateSpeed: 1,
    arcColors: ['rgb(255,84,84)','rgb(61,204,91)','rgb(239,214,19)'],
    arcDelimiters: [20,80],
    rangeLabel: ['0', '1024'],
    needleStartValue: 50,
  }

  tokenExist:boolean;

  constructor(private service:SharedService, private router: Router) { }

  interval = setInterval(() => {
      this.refreshRoomData();
  }, 10000);

  ngOnInit(): void {
    if (sessionStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    };
    this.refreshRoomData();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
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
            brightness: (data.brightness == "") ? ("") : ((1024 - parseInt(data.brightness)).toString()),
            ledState: data.ledState,
            tempVal: (parseFloat(data.temperature) / 0.5).toFixed(2),
            brightVal: ((1024 - parseInt(data.brightness)) / 10).toString(),
            ledVal: (data.ledState == "1")
          });
        });
      }
    });
  }

  onClickLed(id:number) {
    this.GaugeData[id-1].ledVal = !this.GaugeData[id-1].ledVal;
    this.service.toggleLed(id.toString());
  }
}
