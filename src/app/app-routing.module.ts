import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputFormComponent } from './components/input-form/input-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WeatherChartsComponent } from './components/weather-charts/weather-charts.component';
import { ChartsGuard } from './guards/charts.guard';


const appRouting: Routes = [
    {path: '', component: InputFormComponent},
    {path: 'forecast/:name', component: WeatherChartsComponent, canActivate: [ChartsGuard] },
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRouting)
    ],
    exports: [
        RouterModule
    ]
  })
  export class AppRoutingModule { }
