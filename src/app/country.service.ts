import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countryName: string;

  constructor(private apiService: ApiService) { }

  setCountryName(name) {
    this.countryName = name;
  }

  getCountryName() {
    return this.countryName;
  }

}
