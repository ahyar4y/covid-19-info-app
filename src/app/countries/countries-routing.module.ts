import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesPage } from './countries.page';

const routes: Routes = [
  {
    path: '',
    component: CountriesPage
  },
  {
    path: 'country-details',
    loadChildren: () => import('./country-details/country-details.module').then( m => m.CountryDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesPageRoutingModule {}
