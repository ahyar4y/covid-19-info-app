import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { CountryService } from 'src/app/country.service';
import { BookmarkService } from 'src/app/bookmark.service';
import { Country } from '../../country.model';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
})
export class CountryDetailsPage implements OnInit {
  selectedCountry = new Country(null, null, null, null, null, null, false);
  index: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private countryService: CountryService,
    private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('countryId')) {
        return;
      }

      const countryId = paramMap.get('countryId');

      this.index = this.countryService.getCountries().map(e => e.name).indexOf(countryId);

      this.selectedCountry = this.countryService.getCountry(this.index);
    });
  }

  addToBookmark() {
    this.bookmarkService.addToBookmark(this.selectedCountry);
    this.selectedCountry.isInBookmark = true;
    this.countryService.updateCountry(this.index, true);

    this.alertController.create({
      header: 'Bookmark',
      message: 'Country added to Bookmark',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  removeFromBookmark() {
    this.alertController.create({
      header: 'Bookmark',
      message: 'Do you want to remove this country from bookmark?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.bookmarkService.removeFromBookmark(this.selectedCountry);
            this.selectedCountry.isInBookmark = false;
            this.countryService.updateCountry(this.index, false);
            // this.router.navigate(['/home/tabs/countries/' + this.selectedCountry.name]);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
