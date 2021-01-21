import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  token:string;

  readonly APIUrl="http://localhost:8080/api";

  constructor(private http:HttpClient) { }

  getRoomData(){
    return this.http.post(this.APIUrl+'/roomData',{token: this.token});
  }

  login(username:string, password:string) {
    return this.http.post(this.APIUrl+'/login',{username, password})
      .subscribe((data:any) => {
        this.token = data.token;
      });
  }

  logout() {
    this.token='';
    return this.http.post(this.APIUrl+'/logout',{token: this.token});
  }
}
