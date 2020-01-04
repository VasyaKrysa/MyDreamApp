import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiRequestService {
  apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) { }

  getHttpData(): any {
     return this.http.get( this.apiUrl + '/city');
  }

  getCityName(name: string): any {
    return this.http.get( this.apiUrl + '/city/' + name);
  }
  deleteCity(id: number) {
    return this.http.delete(this.apiUrl + '/city/' + id);
  }
  addCity(id: number, name: string) {
    const body = {Id: id, Name: name};
    console.log(body);
    return this.http.post(this.apiUrl + '/city', body);
  }
}
