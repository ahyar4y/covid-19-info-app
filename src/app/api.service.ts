import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiJson: any;

  constructor(private httpClient: HttpClient) { }

  getGlobalInfo() {
    this.apiJson = this.httpClient.get('https://covid19.mathdro.id/api');

    return this.apiJson;
  }

  getCountries() {
    this.apiJson = this.httpClient.get('https://covid19.mathdro.id/api/countries');

    return this.apiJson;
  }

  getCountry(countryId) {
    this.apiJson = this.httpClient.get('https://covid19.mathdro.id/api/countries/' + countryId);

    return this.apiJson;
  }
}
