import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CartModalComponent } from "../cart-modal/cart-modal.component";
import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CartModalService } from '../../../core/services/cart-modal.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, CartModalComponent, AsyncPipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  cartModalShown$: Observable<boolean | undefined> = of(undefined);
  cartCount$: Observable<number> = of(0);

  constructor(
    private cartModalService: CartModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartModalShown$ = this.cartModalService.getModalShown$();
    this.cartCount$ = this.cartService.getItems$().pipe(
      map(items => items.length)
    );
  }
}
