import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { CityListDataService } from '../services/cityListData.service';


@Injectable({
  providedIn: 'root'
})
export class ChartsGuard implements CanActivate {

  constructor(private cityList: CityListDataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cityList.getReceivedCityList().length > 0) {
    return true;
    } else {
    return false;
    }
  }
}
