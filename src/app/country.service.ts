import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countryList: Country[] = new Array();

  constructor(private apiService: ApiService) { }

  async fetchCountries() {
    this.apiService.getCountries().subscribe(async data => {
      for (const element of data.countries) {
        this.countryList.push(new Country(
          element.iso3,
          element.name,
          null,
          null,
          null,
          null,
          false
          ));
      }
      console.log(this.countryList);
    });
  }

  getCountries() {
    return this.countryList;
  }

  async getCountryDetails(countryId, index) {
    this.apiService.getCountry(countryId).subscribe(async data => {
      this.countryList[index].confirmed = data.confirmed.value;
      this.countryList[index].deaths = data.deaths.value;
      this.countryList[index].recovered = data.recovered.value;
      this.countryList[index].lastUpdate = data.lastUpdate.slice(0, 10) + ', ' + data.lastUpdate.slice(11, 19);
    });
  }

  getCountry(index) {
    return this.countryList[index];
  }

  updateCountry(index, value) {
    this.countryList[index].isInBookmark = value;
  }
}
