import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { CountryService } from '../country.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  globalConfirmed: number;
  globalDeaths: number;
  globalRecovered: number;
  lastUpdate: any;

  constructor(private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit() {
    this.apiService.getGlobalInfo().subscribe(data => {
      this.globalConfirmed = data.confirmed.value;
      this.globalDeaths = data.deaths.value;
      this.globalRecovered = data.recovered.value;
      this.lastUpdate = data.lastUpdate.slice(0, 10) + ', ' + data.lastUpdate.slice(11, 19);
    })
  }

}
