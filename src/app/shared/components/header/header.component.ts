import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingCart, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { CartModalStateService } from '../../../core/services/cart-modal-state.service';
import { CartStateService } from '../../../core/services/cart-state.service';
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
    private cartModalStateService: CartModalStateService,
    private cartStateService: CartStateService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.cartCount$ = this.cartStateService.getItems().pipe(
      map(items => items.length)
    );
  }

  showCartModal() {
    this.cartModalStateService.openModal();
  }

  search(keyword: string) {
    this.apiService.setSearchKeyword(keyword);
  }
}
