import { Injectable } from '@angular/core';

import { CountryService } from './country.service';
import { UserService } from './user.service';
import { PostProvider } from '../providers/post-provider';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  countryList: Country[] = new Array();

  constructor(private postProvider: PostProvider, private userService: UserService, private countryService: CountryService) { }

  addToBookmark(countryId, index) {
    return new Promise(resolve => {
      const body = {
        action: 'addBookmark',
        username: this.userService.getUsername(),
        country: countryId
      };

      this.postProvider.postData(body, 'process-api.php').subscribe(data => {
        this.countryList.push(this.countryService.getCountry(index));
        console.log('added to bookmark');
      });
    });
  }

  removeFromBookmark(countryId, index) {
    const body = {
      action: 'removeBookmark',
      username: this.userService.getUsername(),
      country: countryId
    };

    this.postProvider.postData(body, 'process-api.php').subscribe(data => {
      this.countryList = this.countryList.filter(e => e.name !== this.countryService.getCountry(index).name);
      console.log(this.countryList);
    });
  }

  async loadBookmark(userId) {
    return new Promise(resolve => {
      const body = {
        action: 'loadBookmark',
        username: userId
      };

      this.countryList = [];
      this.postProvider.postData(body, 'process-api.php').subscribe(async data => {
        for (let el of data.result) {
          let index = this.countryService.getCountries().map(e => e.name).indexOf(el.country);
          this.countryService.updateCountry(index, true);
          this.countryList.push(this.countryService.getCountry(index));
        }
        resolve(true);
      });
    });
  }

  getBookmark() {
    return this.countryList;
  }
}
