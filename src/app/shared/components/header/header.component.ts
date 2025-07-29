import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingCart, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { CartModalService } from '../../../core/services/cart-modal.service';
import { CartService } from '../../../core/services/cart.service';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-header',
  imports: [NgIcon, AsyncPipe],
  providers: [provideIcons({ heroShoppingCart, heroMagnifyingGlass })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartCount$: Observable<number> = of(0);

  constructor(
    private cartModalService: CartModalService, 
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cartCount$ = this.cartService.getItems$().pipe(
      map(items => items.length)
    );
  }

  showCartModal() {
    this.cartModalService.showModal();
  }

  search(keyword: string) {
    this.apiService.setSearchKeyword(keyword);
  }
}
