import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'main',
                children: [
                    {
                        path: '',
                        loadChildren: '../main/main.module#MainPageModule'
                    }
                ]
            },
            {
                path: 'countries',
                children: [
                    {
                        path: '',
                        loadChildren: '../countries/countries.module#CountriesPageModule'
                    },
                    {
                        path: ':countryId',
                        loadChildren: '../countries/country-details/country-details.module#CountryDetailsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/home/tabs/main',
                pathMatch: 'full'
            }
        ]
      },
      {
          path: '',
          redirectTo: '/home/tabs/main',
          pathMatch: 'full'
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
