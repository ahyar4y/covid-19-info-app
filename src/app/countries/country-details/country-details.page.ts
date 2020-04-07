import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { CountryService } from 'src/app/country.service';
import { Country } from '../../country.model';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
})
export class CountryDetailsPage implements OnInit {
  selectedCountry = new Country(null, null, null, null, null, null);

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('countryId')) {
        return;
      }

      const countryId = paramMap.get('countryId');

      const index = this.countryService.getCountries().map(e => e.name).indexOf(countryId);

      this.selectedCountry = this.countryService.getCountry(index);
    });
  }

}
