import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { WeatherDataService } from 'src/app/services/weatherData.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
export class HeaderComponent implements OnInit {

  constructor( public weatherData: WeatherDataService, private router: Router) {}

  ngOnInit() {
  }

  onHeaderClick() {
    this.router.navigate(['/']);
  }
}
