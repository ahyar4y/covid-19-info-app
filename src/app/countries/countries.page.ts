import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { CountryService } from '../country.service';
import { Country } from '../country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  countries: Country[];

  constructor(private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getCountryDetails();
    this.countries = this.countryService.getCountries();
  }

}
