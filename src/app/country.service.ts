import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countryList: Country[] = new Array();

  constructor(private apiService: ApiService) { }

  fetchCountries() {
    this.apiService.getCountries().subscribe(data => {
      for (const element of data.countries) {
        this.countryList.push(new Country(
          element.iso3,
          element.name,
          null,
          null,
          null,
          null
          ));
      }
      // console.log(this.countryList);
    });
  }

  getCountries() {
    return this.countryList;
  }

  getCountryDetails() {
    for (const element of this.countryList) {
      this.apiService.getCountry(element.name).subscribe(data => {
        element.confirmed = data.confirmed.value;
        element.deaths = data.deaths.value;
        element.recovered = data.recovered.value;
        element.lastUpdate = data.lastUpdate.slice(0, 10) + ', ' + data.lastUpdate.slice(11, 19);
      });
    }
  }

  getCountry(index) {
    return this.countryList[index];
  }

}
