import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Username:string;
  Password:string;
  tokenExist:boolean;

  constructor(private service:SharedService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') == null) {
      this.tokenExist = false;
    } else {
      this.tokenExist = true;
    };
    console.log(sessionStorage.getItem('token'));
  }

  login() {
    this.service.login(this.Username, this.Password).subscribe((data:any) => {
      sessionStorage.setItem('token', data.token);
      this.router.navigate(['/gauge']);
    });;
  }
}
