import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { CountryService } from '../country.service';
import { Country } from '../country.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  global = new Country(null, null, null, null, null, null, false); // ???

  constructor(private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.fetchCountries();
    this.showInfo();
  }

  async showInfo() {
    this.apiService.getGlobalInfo().subscribe(async data => {
      this.global = new Country(
        'global',
        'global',
        data.confirmed.value,
        data.deaths.value,
        data.recovered.value,
        data.lastUpdate.slice(0, 10) + ', ' + data.lastUpdate.slice(11, 19),
        false
      );
    });
  }

}
