import { Injectable } from '@angular/core';

import { WeahterForecast } from '../interfaces/weahterForecast.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherChartsDataService {

  constructor() { }

  private citiesForecast: WeahterForecast = {
    temperatureArr: [],
    pressureArr: [],
    humidityArr: [],
    windSpeedArr: []
  };
  private idCitiesAded: number[] = [];

  updateCharts() {
    this.citiesForecast.temperatureArr = [...this.citiesForecast.temperatureArr];
    this.citiesForecast.humidityArr = [...this.citiesForecast.humidityArr];
    this.citiesForecast.pressureArr = [...this.citiesForecast.pressureArr];
    this.citiesForecast.windSpeedArr = [...this.citiesForecast.windSpeedArr];
  }
  getForecast(): WeahterForecast {
    return this.citiesForecast;
  }
  isHaveCity(id: number): boolean {
    let result = false;
    this.idCitiesAded.forEach(item => {
      if (item === id) {
      result = true;
      }
    });
    return result;
  }
  deleteCity(id: number) {
    this.idCitiesAded.forEach(item => {
      if (item === id) {
        const index = this.idCitiesAded.indexOf(item);
        this.citiesForecast.temperatureArr.splice(index, 1);
        this.citiesForecast.pressureArr.splice(index, 1);
        this.citiesForecast.humidityArr.splice(index, 1);
        this.citiesForecast.windSpeedArr.splice(index, 1);
        this.idCitiesAded.splice(index, 1);
      }
    });
    this.updateCharts();
  }
  clearAll() {
    this.citiesForecast = {
      temperatureArr: [],
      pressureArr: [],
      humidityArr: [],
      windSpeedArr: []
    };
    this.idCitiesAded = [];
  }
  setForecast(response: any) {
    this.citiesForecast.temperatureArr.push({name: response.rootElement.city.name, series: []});
    this.citiesForecast.pressureArr.push({name: response.rootElement.city.name, series: []});
    this.citiesForecast.humidityArr.push({name: response.rootElement.city.name, series: []});
    this.citiesForecast.windSpeedArr.push({name: response.rootElement.city.name, series: []});

    this.idCitiesAded.push(response.rootElement.city.id);

    const elemCount = this.citiesForecast.temperatureArr.length;

    response.rootElement.list.forEach(element => {
      this.citiesForecast.temperatureArr[elemCount - 1].series.push({
        name: element.dt_txt,
        value: element.main.temp
      });
      this.citiesForecast.pressureArr[elemCount - 1].series.push({
        name: element.dt_txt,
        value: element.main.pressure
      });
      this.citiesForecast.humidityArr[elemCount - 1].series.push({
        name: element.dt_txt,
        value: element.main.humidity
      });
      this.citiesForecast.windSpeedArr[elemCount - 1].series.push({
        name: element.dt_txt,
        value: element.wind.speed
      });
    });
    this.updateCharts();
  }
}
