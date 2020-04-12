import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { ApiService } from '../api.service';
import { BookmarkService } from '../bookmark.service';
import { CountryService } from '../country.service';
import { UserService } from '../user.service';

import { Country } from '../country.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  global = new Country(null, null, null, null, null, null, false); // ???

  constructor(
    private router: Router,
    private apiService: ApiService,
    private bookmarkService: BookmarkService,
    private countryService: CountryService,
    private userService: UserService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.countryService.fetchCountries();
    this.showInfo();
  }

  async showInfo() {
    this.apiService.getGlobalInfo().subscribe(async data => {
      this.global = new Country(
        'global',
        'global',
        data.confirmed.value,
        data.deaths.value,
        data.recovered.value,
        data.lastUpdate.slice(0, 10) + ', ' + data.lastUpdate.slice(11, 19),
        false
      );
    });
  }

  isUserLoggedIn() {
    return this.userService.isUserLoggedIn();
  }

  getUser() {
    return this.userService.getUsername();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.userService.userLogout();
            this.countryService.resetCountries();
            this.bookmarkService.loadBookmark(this.userService.getUsername());

            this.toastController.create({
              message: 'Logged out!',
              duration: 2000,
              color: 'primary'
            }).then(toast => toast.present());
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

  editUser(username) {
    this.router.navigate(['/register/' + username]);
  }

}
