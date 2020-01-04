import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityListDataService {

  constructor() { }

  private cityList: {id: number, name: string}[] = [];
  private autocompleteList: {name: string}[] = [];

  setReceivedCityList(response: {id: number, name: string}[]) {
    this.cityList = response;
  }

  getReceivedCityList() {
    return this.cityList;
  }

  setAutocompleteCityList(response: {name: string}[]) {
    this.autocompleteList = response;
  }

  getAutocompleteCityList(): {name: string}[] {
    return this.autocompleteList;
  }

}
