import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HousingPurchaseComponent } from './housing-purchase/housing-purchase.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Homes'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'
    },
    {
        path: 'favourites',
        component: FavouritesComponent,
        title: 'Favourites Page'
    },
    {
        path: 'purchase',
        component: HousingPurchaseComponent,
        title: 'Purchase Page'
    }
];

export default  routeConfig;