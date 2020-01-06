import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { environment } from 'src/environments/environment';


@Injectable()
export class WeatherRequestService {

    apiUrl = environment.weatherApiUrl;

    constructor(private http: HttpClient) { }

    getHttpData(name: string): any {

        return this.http.get( this.apiUrl + '/weather/' + name);
    }

    getForecast(id: number): any {
        let paramsHttp = new HttpParams();
        paramsHttp = paramsHttp.append('id', id + '');

        return this.http.get( this.apiUrl + '/weather',
        {
            params: paramsHttp
        });
    }
}
