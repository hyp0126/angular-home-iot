import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl="http://localhost:8080/api";

  constructor(private http:HttpClient) { }

  getRoomData() {
    return this.http.post(this.APIUrl+'/roomData',{token: sessionStorage.getItem('token')});
  }

  toggleLed(id:string) {
    return this.http.post(this.APIUrl+'/led',{id, token: sessionStorage.getItem('token')})
      .subscribe((data:any) => {
      });
  }

  login(username:string, password:string) {
    return this.http.post(this.APIUrl+'/login',{username, password})
  }

  logout() {
    sessionStorage.clear();
    return this.http.post(this.APIUrl+'/logout',{token: sessionStorage.getItem('token')})
      .subscribe((data:any) => {
        sessionStorage.clear();
      });
  }
}
