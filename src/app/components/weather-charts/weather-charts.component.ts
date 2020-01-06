import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherRequestService } from 'src/app/services/weatherRequest.service';
import { WeatherChartsDataService } from 'src/app/services/weatherChartsData.service';
import { CityListDataService } from 'src/app/services/cityListData.service';
import { MetricsRequestService } from 'src/app/services/metricsRequest.service';


@Component({
  selector: 'app-weather-charts',
  templateUrl: './weather-charts.component.html',
  styleUrls: ['./weather-charts.component.scss']
})
export class WeatherChartsComponent implements OnInit, OnDestroy {

  errorMessage = '';
  metrics = false;
  cities = false;
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
  autoScale = true;

  constructor(
     private route: ActivatedRoute,
     private weatherRequest: WeatherRequestService,
     private cityList: CityListDataService,
     private metricsRequest: MetricsRequestService,
     public weatherChartsData: WeatherChartsDataService
     ) {}

  ngOnInit() {
    this.onLoad();
  }

  ngOnDestroy() {
    this.onDestroy();
  }

  onDestroy() {
    this.weatherChartsData.clearAll();
    if (!this.weatherChartsData.CheckBoxValues.temperature) {
      this.metricsRequest.deleteMetrics('temperature').subscribe();
    }
    if (!this.weatherChartsData.CheckBoxValues.pressure) {
      this.metricsRequest.deleteMetrics('pressure').subscribe();
    }
    if (!this.weatherChartsData.CheckBoxValues.humidity) {
      this.metricsRequest.deleteMetrics('humidity').subscribe();
    }
    if (!this.weatherChartsData.CheckBoxValues.windSpeed) {
      this.metricsRequest.deleteMetrics('windSpeed').subscribe();
    }
  }

  onLoad() {
    if (this.cityList.getReceivedCityList().length > 0) {
      const name = this.route.snapshot.params.name;
      const id = this.cityList.getReceivedCityList().find(element => element.name === name).id;
      this.weatherRequest.getForecast(id).subscribe(response => {
          this.weatherChartsData.setForecast(response);
          this.errorMessage = '';
      }, error => this.errorMessage = error.statusText);
    }
  }

  checkBoxClick(metricName: string) {
    if (this.weatherChartsData.CheckBoxValues[metricName]) {
      const metrics = this.metricsRequest.toMetricsDataConverter(
        this.weatherChartsData.getForecast()[metricName + 'Arr']);
      this.metricsRequest.setMetrics(metrics, metricName).subscribe();
      this.weatherChartsData.getForecast()[metricName + 'Arr'] = [];
      this.weatherChartsData.updateCharts();
      this.weatherChartsData.CheckBoxValues[metricName] = false;
    } else {
      this.metricsRequest.getMetrics(metricName).subscribe(response => {
        this.weatherChartsData.getForecast()[metricName + 'Arr'] =
        this.metricsRequest.toChartsDataConverter(response);
        this.weatherChartsData.updateCharts();
        this.weatherChartsData.CheckBoxValues[metricName] = true;
      });
    }
  }
}
