import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { WeatherDataService } from 'src/app/services/weatherData.service';
import { CityListDataService } from 'src/app/services/cityListData.service';
import { WeatherApiRequestService } from 'src/app/services/weatherApiRequest.service';



@Component({
  selector: 'app-city-responce',
  templateUrl: './city-responce.component.html',
  styleUrls: ['./city-responce.component.scss'],
  animations: [
  trigger('animationTriggerName', [
    transition('void => *', [
      style({opacity: 0}),
      animate('1.2s', style({opacity: 1})),
    ]),
    transition('* => void', [
      animate('1.2s', style({opacity: 0}))
    ])
   ])
  ]
})
export class CityResponceComponent implements OnInit {

  constructor(
    private weatherApi: WeatherApiRequestService,
    public weatherData: WeatherDataService,
    public cityList: CityListDataService
    ) { }

  ngOnInit() {
  }

  onAddClick() {
    this.weatherApi.addCity(
      this.weatherData.getReceivedWeather().id,
       this.weatherData.getReceivedWeather().name).subscribe(
         () => {
          this.weatherApi.getHttpData().subscribe(response => this.cityList.setReceivedCityList(response));
    });
  }
}
