import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModalItemComponent } from './cart-modal-item.component';
import { CartStateService } from '../../../core/services/cart-state.service';
import { OrderItem } from '../../models/order-item';
import { CurrencyPipe } from '@angular/common';

describe('CartModalItemComponent', () => {
  let cartStateService: CartStateService;
  let fixture: ComponentFixture<CartModalItemComponent>;
  let component: CartModalItemComponent;
  let element: HTMLElement;

  const cartItem: OrderItem = {
    "product": {
      "id": 1,
      "name": "Sony WH-1000XM5",
      "description": "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
      "image": "images/product01.jpg",
      "price": 49
    },
    "quantity": 2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartModalItemComponent],
      providers: [
        { provide : CartStateService, useValue: jasmine.createSpyObj('CartStateService', ['removeItem']) }
      ]
    }).compileComponents();

    cartStateService = TestBed.inject(CartStateService);
    fixture = TestBed.createComponent(CartModalItemComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.componentRef.setInput('cart-item', cartItem);

    fixture.detectChanges();
  });

  it('should contains item attributes', () => {
    expect(element.querySelector('.cart-item-img')?.getAttribute('src')).toBe(cartItem.product.image);
    expect(element.querySelector('.item-product-name')?.textContent).toBe(cartItem.product.name);
    expect(element.querySelector('.item-product-price')?.textContent).toBe(
      new CurrencyPipe('en-US').transform((cartItem.product.price * cartItem.quantity), 'USD')
    );
    const itemCountElement: HTMLInputElement | null = element.querySelector('.item-count');
    expect(itemCountElement?.value).toBe(cartItem.quantity.toString());
  });

  it('should increment item counter', () => {
    let itemCount = cartItem.quantity;
    const incrementBtnElement: HTMLElement | null = element.querySelector('.increment-btn');

    incrementBtnElement?.click();

    expect(cartItem.quantity).toBe(itemCount + 1);
  });

  it('should decrement item counter', () => {
    let itemCount = cartItem.quantity;
    const decrementBtnElement: HTMLElement | null = element.querySelector('.decrement-btn');

    decrementBtnElement?.click();

    expect(cartItem.quantity).toBe(itemCount - 1);
  });

  it('should remove item from cart', () => {
    const removeBtnElement: HTMLElement | null = element.querySelector('.remove-btn');

    removeBtnElement?.click();

    expect(cartStateService.removeItem).toHaveBeenCalledWith(cartItem.product);
  });
});
