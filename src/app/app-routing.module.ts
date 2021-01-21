import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaugeComponent } from './gauge/gauge.component';
import { ChartComponent } from './chart/chart.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path:'gauge', component:GaugeComponent},
  {path:'chart', component:ChartComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
