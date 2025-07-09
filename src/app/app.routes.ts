import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'product-details/:productId',
        component: ProductDetailsComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
];
