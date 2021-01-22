import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import * as DotEnv from './DotEnv';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  getRoomData() {
    return this.http.post(DotEnv.API_URL+'/roomData',{token: sessionStorage.getItem('token')});
  }

  getTempData(date:Date):Observable<any[]> {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    //local -> UTC Time
    var startTimeD = new Date(year, month, day, 0, 0, 0);
    var startTime = startTimeD.toUTCString();
    var endTimeD = new Date(year, month, day, 23, 59, 59);
    var endTime = endTimeD.toUTCString();

    return this.http.post<any[]>(DotEnv.API_URL+'/temperature',{startTime, endTime, token: sessionStorage.getItem('token')});
  }

  toggleLed(id:string) {
    return this.http.post(DotEnv.API_URL+'/led',{id, token: sessionStorage.getItem('token')})
      .subscribe((data:any) => {
      });
  }

  login(username:string, password:string) {
    return this.http.post(DotEnv.API_URL+'/login',{username, password})
  }

  logout() {
    sessionStorage.clear();
    return this.http.post(DotEnv.API_URL+'/logout',{token: sessionStorage.getItem('token')})
      .subscribe((data:any) => {
        sessionStorage.clear();
      });
  }
}
