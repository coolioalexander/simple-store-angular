import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrash, heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { OrderItem } from '../../models/OrderItem';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-modal-item',
  imports: [NgOptimizedImage, CurrencyPipe, NgIcon],
  providers: [provideIcons({ heroTrash, heroMinus, heroPlus })],
  templateUrl: './cart-modal-item.component.html',
  styleUrl: './cart-modal-item.component.css'
})
export class CartModalItemComponent {
  @Input() cartItem!: OrderItem;

  constructor(private cartService: CartService) {}

  incrementCounter() {
    if (this.cartItem.quantity < 10) 
      this.cartItem.quantity += 1;
  }

  decrementCounter() {
    if (this.cartItem.quantity > 0)
      this.cartItem.quantity -= 1;
  }

  getItemPrice(): number {
    return this.cartItem.product.price * this.cartItem.quantity;
  }

  removeCartItem() {
    this.cartService.removeItem(this.cartItem.product);
  }
}