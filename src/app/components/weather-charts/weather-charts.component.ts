import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherRequestService } from 'src/app/services/weatherRequest.service';
import { WeatherChartsDataService } from 'src/app/services/weatherChartsData.service';
import { CityListDataService } from 'src/app/services/cityListData.service';


@Component({
  selector: 'app-weather-charts',
  templateUrl: './weather-charts.component.html',
  styleUrls: ['./weather-charts.component.scss']
})
export class WeatherChartsComponent implements OnInit, OnDestroy {

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel: string[] = ['Temperature (°C)', 'Pressure (hPa)', 'Humidity (%)', 'Wind Speed (m/sec)'];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  legendTitle = 'Cities';

  // line, area
  autoScale = true;

  constructor(
     private route: ActivatedRoute,
     private weatherRequest: WeatherRequestService,
     private cityList: CityListDataService,
     public weatherChartsData: WeatherChartsDataService
     ) {}

  ngOnInit() {
    this.onLoad();
  }

  ngOnDestroy() {
    this.weatherChartsData.clearAll();
  }

  onLoad() {
    if (this.cityList.getReceivedCityList().length > 0) {
      const name = this.route.snapshot.params.name;
      const id = this.cityList.getReceivedCityList().find(element => element.name === name).id;
      this.weatherRequest.getForecast(id).subscribe(response => {
          this.weatherChartsData.setForecast(response);
      });
    }
  }

}
