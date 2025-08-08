import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CartModalComponent } from "../cart-modal/cart-modal.component";
import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CartModalStateService } from '../../../core/services/cart-modal-state.service';
import { CartStateService } from '../../../core/services/cart-state.service';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, CartModalComponent, AsyncPipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  cartModalState$: Observable<boolean | undefined> = of(undefined);
  cartCount$: Observable<number> = of(0);

  constructor(
    private cartModalStateService: CartModalStateService,
    private cartStateService: CartStateService
  ) {}

  ngOnInit(): void {
    this.cartModalState$ = this.cartModalStateService.getModalState();
    this.cartCount$ = this.cartStateService.getItems().pipe(
      map(items => items.length)
    );
  }
}
