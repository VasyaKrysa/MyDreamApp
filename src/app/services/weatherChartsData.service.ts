import { Injectable } from '@angular/core';

import { WeahterForecast } from '../interfaces/weahterForecast.interface';


@Injectable({
  providedIn: 'root'
})
export class WeatherChartsDataService {

  private citiesForecast: WeahterForecast = {
    temperatureArr: [],
    pressureArr: [],
    humidityArr: [],
    windSpeedArr: []
  };

  CheckBoxValues = {
    temperature : true,
    pressure : true,
    humidity : true,
    windSpeed : true
  };

  constructor() { }

  private setMetric(response: any, metric: string) {
      this.citiesForecast[metric + 'Arr'].push({
        name: response.rootElement.city.name,
        id: response.rootElement.city.id,
          series: []});
      response.rootElement.list.forEach(element => {
        let tempValue = element.main.temp;
        if (metric === 'pressure') {
          tempValue = element.main.pressure;
        } else if (metric === 'humidity') {
          tempValue = element.main.humidity;
        } else if (metric === 'windSpeed') {
          tempValue = element.wind.speed;
        }
        this.citiesForecast[metric + 'Arr'][this.citiesForecast[metric + 'Arr'].length - 1].series.push({
            name: element.dt_txt,
            value: tempValue
        });
      });
  }

  updateCharts() {
    this.citiesForecast.temperatureArr = [...this.citiesForecast.temperatureArr];
    this.citiesForecast.humidityArr = [...this.citiesForecast.humidityArr];
    this.citiesForecast.pressureArr = [...this.citiesForecast.pressureArr];
    this.citiesForecast.windSpeedArr = [...this.citiesForecast.windSpeedArr];
  }

  getForecast(): WeahterForecast {
    return this.citiesForecast;
  }

  isHaveCityMetrics(id: number, metric: string): boolean {
    let result = false;
    this.citiesForecast[metric + 'Arr'].forEach(item => {
      if (item.id === id) {
      result = true;
      }
    });
    return result;
  }

  isHaveCity(id: number): boolean {
    let result = false;
    result = this.isHaveCityMetrics(id, 'temperature');
    if (!result) {
      result = this.isHaveCityMetrics(id, 'pressure');
    }
    if (!result) {
      result = this.isHaveCityMetrics(id, 'humidity');
    }
    if (!result) {
      result = this.isHaveCityMetrics(id, 'windSpeed');
    }
    return result;
  }

  deleteMetricCity(id: number, metric: string) {
    const index = this.citiesForecast[metric + 'Arr'].findIndex(item => item.id === id);
    if ( index >= 0) {
      this.citiesForecast[metric + 'Arr'].splice(index, 1);
    }
  }

  deleteCity(id: number) {
    this.deleteMetricCity(id, 'temperature');
    this.deleteMetricCity(id, 'pressure');
    this.deleteMetricCity(id, 'humidity');
    this.deleteMetricCity(id, 'windSpeed');
    this.updateCharts();
  }

  clearAll() {
    this.citiesForecast = {
      temperatureArr: [],
      pressureArr: [],
      humidityArr: [],
      windSpeedArr: []
    };
  }

  setForecast(response: any) {
    this.setMetric(response, 'temperature');
    this.setMetric(response, 'pressure');
    this.setMetric(response, 'humidity');
    this.setMetric(response, 'windSpeed');
    this.updateCharts();
  }
}
