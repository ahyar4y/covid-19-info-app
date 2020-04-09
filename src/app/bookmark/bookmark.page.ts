import { Component, OnInit } from '@angular/core';

import { BookmarkService } from '../bookmark.service';
import { Country } from '../country.model';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {
  countryList: Country[] = new Array();

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.countryList = this.bookmarkService.getCountries();
  }

}
