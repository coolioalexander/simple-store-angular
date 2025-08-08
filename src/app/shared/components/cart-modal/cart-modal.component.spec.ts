import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModalComponent } from './cart-modal.component';
import { CartModalStateService } from '../../../core/services/cart-modal-state.service';
import { CartStateService } from '../../../core/services/cart-state.service';
import { of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import cartItems from '../../../../assets/mocks/cart-items.json' assert { type: 'json' };

describe('CartModalComponent', () => {
  let cartModalStateService: CartModalStateService;
  let cartStateService: CartStateService;
  let fixture: ComponentFixture<CartModalComponent>;
  let component: CartModalComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    const cartModalStateServiceSpy = jasmine.createSpyObj('cartModalStateService', ['closeModal']);
    const cartStateServiceSpy = jasmine.createSpyObj('cartStateService', ['getItems', 'removeItems']);
    cartStateServiceSpy.getItems.and.returnValue(of(cartItems));

    await TestBed.configureTestingModule({
      imports: [CartModalComponent],
      providers: [
        { provide: CartModalStateService, useValue: cartModalStateServiceSpy },
        { provide: CartStateService, useValue: cartStateServiceSpy }
      ]
    }).compileComponents();

    cartModalStateService = TestBed.inject(CartModalStateService);
    cartStateService = TestBed.inject(CartStateService);

    fixture = TestBed.createComponent(CartModalComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should get cart total price', () => {
    const totalPrice = cartItems.reduce((totalPrice, item) =>
      totalPrice + item.product.price * item.quantity, 0);

    expect(element.querySelector('.total-price')?.textContent).toBe(
      new CurrencyPipe('en-US').transform(totalPrice, 'USD')
    );
  });

  it('should clear cart', () => {
    const clearBtnElement: HTMLElement | null = element.querySelector('.clear-btn');

    clearBtnElement?.click();

    expect(cartStateService.removeItems).toHaveBeenCalled();
  });

  it('should close cart modal', () => {
    const closeBtnElement: HTMLElement | null = element.querySelector('.close-btn');

    closeBtnElement?.click();

    expect(cartModalStateService.closeModal).toHaveBeenCalled();
  });
});
