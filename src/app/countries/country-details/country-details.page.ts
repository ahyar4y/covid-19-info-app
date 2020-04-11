import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController,
    private alertController: AlertController,
    private countryService: CountryService,
    private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('countryId')) {
        return;
      }

      const countryId = paramMap.get('countryId');

      this.index = this.countryService.getCountries().map(e => e.name).indexOf(countryId);

      this.countryService.getCountryDetails(countryId, this.index);
      this.selectedCountry = this.countryService.getCountry(this.index);
      console.log(this.selectedCountry);
    });
  }

  addToBookmark() {
    this.selectedCountry.isInBookmark = true;
    this.countryService.updateCountry(this.index, true);
    this.bookmarkService.addToBookmark(this.selectedCountry.name, this.index);

    this.toastController.create({
      message: 'Country added to Bookmark',
      duration: 2000,
      color: 'primary'
    }).then(toast => toast.present());
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
            this.selectedCountry.isInBookmark = false;
            this.countryService.updateCountry(this.index, false);
            this.bookmarkService.removeFromBookmark(this.selectedCountry.name, this.index);
            // this.router.navigate(['/home/tabs/countries/' + this.selectedCountry.name]);
            this.toastController.create({
              message: 'Country removed from Bookmark',
              duration: 2000,
              color: 'primary'
            }).then(toast => toast.present());
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
