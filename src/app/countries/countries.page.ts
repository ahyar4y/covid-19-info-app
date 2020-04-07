import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  countryList: any[];

  constructor(private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit() {
    this.apiService.getCountries().subscribe(data => {
      this.countryList = data.countries;
      console.log(this.countryList);
    });
  }

  addCountry(iso3) {
    let country = this.countryList.find(e => e.iso3 === iso3);
    this.countryService.setCountryName(country.name);
  }

}
