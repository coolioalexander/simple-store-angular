import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark, heroTrash } from '@ng-icons/heroicons/outline';
import { CartModalItemComponent } from "../cart-modal-item/cart-modal-item.component";
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartModalService } from '../../../core/services/cart-modal.service';
import { CartService } from '../../../core/services/cart.service';
import { map, Observable, of, reduce } from 'rxjs';
import { OrderItem } from '../../models/OrderItem';

@Component({
  selector: 'app-cart-modal',
  imports: [NgIcon, CartModalItemComponent, CurrencyPipe, AsyncPipe],
  providers: [provideIcons({ heroXMark, heroTrash })],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent implements OnInit {
  cartItems$: Observable<OrderItem[]> = of([]);

  constructor(
    private cartModalService: CartModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getItems$();
  }
  
  hideCartModal() {
    this.cartModalService.hideModal();
  }  

  clearCart() {
    this.cartService.clearCart();
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))
    );
  }
}
