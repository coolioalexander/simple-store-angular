import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingBag, heroHeart } from '@ng-icons/heroicons/outline';
import { heroShoppingBagSolid, heroHeartSolid } from '@ng-icons/heroicons/solid';
import { CartService } from '../../../core/services/cart.service';
import { log } from 'console';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, NgIcon, CurrencyPipe],
  providers: [provideIcons({ heroShoppingBag, heroShoppingBagSolid, heroHeart, heroHeartSolid })],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  favorite: boolean = false;
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  updateFavorite() {
    this.favorite = !this.favorite;
  }

  addToCart() {
    this.cartService.addItem(this.product);
  }
}
