import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { WeatherRequestService } from '../../services/weatherRequest.service';
import { WeatherDataService } from 'src/app/services/weatherData.service';
import { MyValidators } from 'src/app/validators/noDigits.validator';
import { CityListDataService } from 'src/app/services/cityListData.service';
import { WeatherApiRequestService } from 'src/app/services/weatherApiRequest.service';
import { WeatherChartsDataService } from 'src/app/services/weatherChartsData.service';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  animations: [
    trigger('animationTriggerName', [
      transition('void => *', [
        style({flexGrow: 0}),
        animate('1.2s', style({flexGrow: 1})),
      ]),
      transition('* => void', [
        animate('1.2s', style({flexGrow: 0}))
      ])
     ])
    ]
})
export class InputFormComponent implements OnInit {
  cityForm: FormGroup = new FormGroup({
    cityName: new FormControl('', [Validators.required, this.validator.cityNameValidator])
});


  constructor(
    private weatherRequest: WeatherRequestService,
    private weatherData: WeatherDataService,
    private validator: MyValidators,
    private weatherApiRequest: WeatherApiRequestService,
    private weatherForecast: WeatherChartsDataService,
    public cityList: CityListDataService
    ) {}

  ngOnInit() {
    this.autocompleteCityList();
  }

  submitFunction() {
      this.weatherRequest.getHttpData(this.cityForm.value.cityName).subscribe(response => {
      this.weatherData.setReceivedWeather(response);
    }, error => {
      this.weatherData.setErrorMessage(error.status, error.statusText);
      console.log(error);
      });
      console.log(this.cityForm);
  }

  clearFunc() {
    this.weatherData.isInfoVisible = false;
    this.weatherData.isNotFound = false;
    this.cityForm.setValue({
      cityName: ''
    });
    this.cityForm.reset();
  }

  autocompleteCityList() {
    this.cityForm.get('cityName').valueChanges.subscribe(value => {
        if (value !== '') {
          this.weatherApiRequest.getCityName(value).subscribe(response => {
            this.cityList.setAutocompleteCityList(response);
           });
          } else {
            this.cityList.setAutocompleteCityList([]);
          }
      });
  }
  autocompleteClick(myCity: string) {
    this.cityForm.patchValue(
      {cityName: myCity},
      {emitEvent: false}
    );
    this.cityList.setAutocompleteCityList([]);
  }
}
