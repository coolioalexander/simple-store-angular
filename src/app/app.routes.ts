import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'product/:productId',
        component: ProductDetailComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
];
