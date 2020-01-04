import { Component, OnInit } from '@angular/core';

import { WeatherApiRequestService } from 'src/app/services/weatherApiRequest.service';
import { CityListDataService } from 'src/app/services/cityListData.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  constructor(
    private weather: WeatherApiRequestService,
    public weatherData: CityListDataService,
    private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.weather.getHttpData().subscribe(response => this.weatherData.setReceivedCityList(response));
  }

  deleteClick(index: number, event: any) {
    const id = this.weatherData.getReceivedCityList()[index].id;
    this.weather.deleteCity(id).subscribe(() => {
      this.loadData();
    });
    event.stopPropagation();
  }
  navigateClick(name, event) {
    this.router.navigate(['forecast', name]);
    event.stopPropagation();
  }

}
