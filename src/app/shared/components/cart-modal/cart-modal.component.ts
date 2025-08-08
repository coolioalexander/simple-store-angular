import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark, heroTrash } from '@ng-icons/heroicons/outline';
import { heroTrashSolid } from '@ng-icons/heroicons/solid';
import { CartModalItemComponent } from "../cart-modal-item/cart-modal-item.component";
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartModalStateService } from '../../../core/services/cart-modal-state.service';
import { CartStateService } from '../../../core/services/cart-state.service';
import { map, Observable, of } from 'rxjs';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-cart-modal',
  imports: [NgIcon, CartModalItemComponent, CurrencyPipe, AsyncPipe],
  providers: [provideIcons({ heroXMark, heroTrash, heroTrashSolid })],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent implements OnInit {
  cartItems$: Observable<OrderItem[]> = of([]);

  constructor(
    private cartModalStateService: CartModalStateService,
    private cartStateService: CartStateService
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartStateService.getItems();
  }

  closeCartModal() {
    this.cartModalStateService.closeModal();
  }

  clearCart() {
    this.cartStateService.removeItems();
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))
    );
  }
}
