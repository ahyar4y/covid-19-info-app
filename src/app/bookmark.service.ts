import { Injectable } from '@angular/core';

import { Country } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  countryList: Country[] = new Array();

  constructor() { }

  addToBookmark(country){
    this.countryList.push(country);
  }

  removeFromBookmark(country) {
    this.countryList = this.countryList.filter(e => {
      return e !== country;
    });
  }

  getCountries() {
    return this.countryList;
  }
}
