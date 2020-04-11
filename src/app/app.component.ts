import { Component } from '@angular/core';

import { Platform, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserService } from './user.service';
import { BookmarkService } from './bookmark.service';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private toastController: ToastController,
    private userService: UserService,
    private bookmarkService: BookmarkService,
    private countryService: CountryService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logOut() {
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
}
