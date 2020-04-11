import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../user.service';
import { BookmarkService } from '../bookmark.service';
import { Country } from '../country.model';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit, OnDestroy {
  countryList: Country[] = new Array();

  constructor(private bookmarkService: BookmarkService, private userService: UserService) { }

  ngOnInit() {
    this.countryList = this.bookmarkService.getBookmark();
    console.log(this.countryList);
  }

  ngOnDestroy() {
    this.countryList = [];
  }

}
