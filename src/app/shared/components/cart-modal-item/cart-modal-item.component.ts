import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrash, heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { OrderItem } from '../../models/order-item';
import { CartStateService } from '../../../core/services/cart-state.service';

@Component({
  selector: 'app-cart-modal-item',
  imports: [NgOptimizedImage, CurrencyPipe, NgIcon],
  providers: [provideIcons({ heroTrash, heroMinus, heroPlus })],
  templateUrl: './cart-modal-item.component.html',
  styleUrl: './cart-modal-item.component.css'
})
export class CartModalItemComponent {
  @Input('cart-item') cartItem!: OrderItem;

  constructor(private cartStateService: CartStateService) {}

  incrementCounter() {
      this.cartItem.quantity += 1;
  }

  decrementCounter() {
    if (this.cartItem.quantity > 1)
      this.cartItem.quantity -= 1;
  }

  getItemPrice() {
    return this.cartItem.product.price * this.cartItem.quantity;
  }

  removeCartItem() {
    this.cartStateService.removeItem(this.cartItem.product);
  }
}
