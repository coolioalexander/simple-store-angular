import { TestBed } from '@angular/core/testing';

import { CartStateService } from './cart-state.service';

import cartProducts from '../../../assets/mocks/cart-products.json' assert { type: 'json' };
import cartItems from '../../../assets/mocks/cart-items.json' assert { type: 'json' };

describe('CartStateService', () => {
  let service: CartStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartStateService);

    cartProducts.forEach(product => service.addItem(product));
  });

  it('should have 3 items on initialization', () => {
    service.getItems().subscribe(items => {
      expect(items.length).toBe(3);
      expect(items).toEqual(cartItems);
    });
  });

  it('should have 4 items (1,1,1,1) when adding item not yet in the cart', () => {
    const product = {
      "id": 4,
      "name": "Samsung Galaxy Watch 6",
      "description": "Samsung Galaxy Watch 6 (40mm & 44mm)",
      "image": "images/product04.jpg",
      "price": 99
    };

    service.addItem(product);

    service.getItems().subscribe(items => {
      expect(items.length).toBe(4);
      expect(items.find(item => item.product.id === product.id)?.quantity).toBe(1);
    });
  });

  it('should have 4 items (1,1,2) when adding item been in the cart', () => {
    const product = {
      "id": 3,
      "name": "Polaroid Now Gen 3",
      "description": "Polaroid Now Generation 3 Instant Camera",
      "image": "images/product03.jpg",
      "price": 75
    };

    service.addItem(product);

    service.getItems().subscribe(items => {
      expect(items.length).toBe(3);
      expect(items.find(item => item.product.id === product.id)?.quantity).toBe(2);
    });
  });

  it('should have 2 items after removing 1 item from cart', () => {
    const product = {
      "id": 3,
      "name": "Polaroid Now Gen 3",
      "description": "Polaroid Now Generation 3 Instant Camera",
      "image": "images/product03.jpg",
      "price": 75
    };

    service.removeItem(product);

    service.getItems().subscribe(items => {
      expect(items.length).toBe(2);
    });
  });

  it('should have no items when removing all items', () => {
    service.removeItems();

    service.getItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
  });
});
