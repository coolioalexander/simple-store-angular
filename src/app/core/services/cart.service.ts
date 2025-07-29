import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../../shared/models/OrderItem';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<OrderItem[]>([]);

  getItems$() {
    return this.cartSubject.asObservable();
  }

  addItem(product: Product) {
    const cart = this.cartSubject.value;    
    const index = cart.findIndex(item => item.product.id === product.id);

    if (index != -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ product: product, quantity: 1 });
    }
    this.cartSubject.next(cart);
  }

  removeItem(product: Product) {
    const cart = this.cartSubject.value.filter(item => item.product.id !== product.id);
    this.cartSubject.next(cart);
  }

  clearCart() {
    this.cartSubject.next([]);
  }
}
