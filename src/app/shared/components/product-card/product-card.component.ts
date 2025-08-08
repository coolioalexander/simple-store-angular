import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingBag, heroHeart } from '@ng-icons/heroicons/outline';
import { heroShoppingBagSolid, heroHeartSolid } from '@ng-icons/heroicons/solid';
import { CartStateService } from '../../../core/services/cart-state.service';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, NgIcon, CurrencyPipe],
  providers: [provideIcons({ heroShoppingBag, heroShoppingBagSolid, heroHeart, heroHeartSolid })],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  favorite: boolean = false;
  @Input('product') product!: Product;

  constructor(private cartStateService: CartStateService) {}

  updateFavorite() {
    this.favorite = !this.favorite;
  }

  addToCart() {
    this.cartStateService.addItem(this.product);
  }
}
