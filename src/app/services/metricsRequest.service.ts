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
        tempMetrics.push({cityId: item.id, date: new Date(metric.name), value: metric.value });
      });
    });
    return tempMetrics;
  }
}
