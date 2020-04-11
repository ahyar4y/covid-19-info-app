import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ApiService } from '../api.service';
import { CountryService } from '../country.service';
import { BookmarkService } from '../bookmark.service';
import { Country } from '../country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  countries: Country[];
  item: string;

  constructor(
    private countryService: CountryService,
    private bookmarkService: BookmarkService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.countries = this.countryService.getCountries();
  }

  filterItems() {
    this.countries = this.countryService.filterCountry(this.item);
  }

}
