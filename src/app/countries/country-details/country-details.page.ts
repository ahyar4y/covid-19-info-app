import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { CountryService } from 'src/app/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
})
export class CountryDetailsPage implements OnInit {
  selectedCountryName: string;
  selectedCountryConfirmed: number;
  selectedCountryDeaths: number;
  selectedCountryRecovered: number;
  lastUpdate: string;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private countryService: CountryService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('countryId')) {
        return;
      }

      const countryId = paramMap.get('countryId');

      this.apiService.getCountry(countryId).subscribe(data => {
        this.selectedCountryName = this.countryService.getCountryName();
        this.selectedCountryConfirmed = data.confirmed.value;
        this.selectedCountryDeaths = data.deaths.value;
        this.selectedCountryRecovered = data.recovered.value;
        this.lastUpdate = data.lastUpdate.slice(0, 10) + ', ' + data.lastUpdate.slice(11, 19);
      });
    });
  }

}
