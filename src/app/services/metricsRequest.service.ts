import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { MetricsRequestData } from '../interfaces/metricsRequestData.interface';
import { ChartsData } from '../interfaces/chartsData.interface';
import { CityListDataService } from './cityListData.service';


@Injectable({
  providedIn: 'root'
})
export class MetricsRequestService {
  apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient, private cityList: CityListDataService) { }

  getMetrics(metricName: string): any {
     return this.http.get( this.apiUrl + '/' + metricName);
  }

  setMetrics(requestData: MetricsRequestData[], metricName: string) {
    console.log(requestData);
    return this.http.post(this.apiUrl + '/' + metricName, requestData);
  }

  deleteMetrics(metricName: string) {
    return this.http.delete(this.apiUrl + '/' + metricName);
  }

  toMetricsDataConverter(chartData: ChartsData[]): MetricsRequestData[] {
    const tempMetrics: MetricsRequestData[] = [];
    chartData.forEach(item => {
      item.series.forEach(metric => {
        tempMetrics.push({cityId: item.id, date: metric.name, value: metric.value });
      });
    });
    return tempMetrics;
  }

  toChartsDataConverter(metrics: MetricsRequestData[]): ChartsData[] {
      const tempChartsData: ChartsData[] = [];
      if (metrics.length > 0) {
        metrics.sort((a, b) => a.cityId - b.cityId);
        let tempId = metrics[0].cityId;
        let tempName = this.cityList.getReceivedCityList().find(item => item.id === tempId).name;
        tempChartsData.push({name: tempName, id: tempId, series: []});
        metrics.forEach(item => {
          if (item.cityId === tempChartsData[tempChartsData.length - 1].id) {
            tempChartsData[tempChartsData.length - 1].series.push({name: item.date.toString(), value: item.value});
          } else {
            tempId = item.cityId;
            tempName = this.cityList.getReceivedCityList().find(city => city.id === tempId).name;
            tempChartsData.push({name: tempName, id: tempId, series: [{name: item.date.toString(), value: item.value}]});
          }
        });
        tempChartsData.forEach(elem => {
          elem.series.sort((a, b) => a.name.localeCompare(b.name));
        });
      }
      return tempChartsData;
  }
}
