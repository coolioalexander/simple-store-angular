import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingBag, heroHeart } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, NgIcon, CurrencyPipe],
  providers: [provideIcons({ heroShoppingBag, heroHeart })],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product | undefined;
}
