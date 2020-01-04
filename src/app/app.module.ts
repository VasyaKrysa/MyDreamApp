import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';


import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { CityResponceComponent } from './components/city-responce/city-responce.component';
import { WeatherRequestService } from './services/weatherRequest.service';
import { WeatherDataService } from './services/weatherData.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MyValidators } from './validators/noDigits.validator';
import { CityListComponent } from './components/city-list/city-list.component';
import { WeatherChartsComponent } from './components/weather-charts/weather-charts.component';
import { ChartsCityListComponent } from './components/charts-city-list/charts-city-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputFormComponent,
    CityResponceComponent,
    NotFoundComponent,
    CityListComponent,
    WeatherChartsComponent,
    ChartsCityListComponent
  ],  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [WeatherRequestService, WeatherDataService, MyValidators],
  bootstrap: [AppComponent]
})
export class AppModule { }
