import { Component, OnInit } from '@angular/core';

import { CityListDataService } from 'src/app/services/cityListData.service';
import { WeatherChartsDataService } from 'src/app/services/weatherChartsData.service';
import { WeatherRequestService } from 'src/app/services/weatherRequest.service';

@Component({
  selector: 'app-charts-city-list',
  templateUrl: './charts-city-list.component.html',
  styleUrls: ['./charts-city-list.component.scss']
})
export class ChartsCityListComponent implements OnInit {

  constructor(
    private weather: WeatherRequestService,
    public weatherData: CityListDataService,
    public weatherChartsData: WeatherChartsDataService
    ) { }

  ngOnInit() {
  }

  hideClick(id: number, event: any) {
    this.weatherChartsData.deleteCity(id);
    event.stopPropagation();
  }
  showClick(index: number, event) {
    this.weather.getForecast(index).subscribe(response => {
      this.weatherChartsData.setForecast(response);
    });
    event.stopPropagation();
  }


}
