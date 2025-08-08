import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../core/services/cart-state.service';

describe('ProductCardComponent', () => {
  let cartStateService: CartStateService;
  let fixture: ComponentFixture<ProductCardComponent>;
  let component: ProductCardComponent;
  let element: HTMLElement;

  const product: Product = {
    "id": 1,
    "name": "Sony WH-1000XM5",
    "description": "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    "image": "images/product01.jpg",
    "price": 49
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        { provide: CartStateService, useValue: jasmine.createSpyObj('CartStateService', ['addItem']) }
      ],
    }).compileComponents();

    cartStateService = TestBed.inject(CartStateService);
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.componentRef.setInput('product', product);

    fixture.detectChanges();
  });

  it('should contains product attributes', () => {
    expect(element.querySelector('.product-card-img')?.getAttribute('src')).toBe(product.image);
    expect(element.querySelector('.product-name')?.textContent).toBe(product.name);
    expect(element.querySelector('.product-description')?.textContent).toBe(product.description);
    expect(element.querySelector('.product-price')?.textContent).toBe(
      new CurrencyPipe('en-US').transform(product.price, 'USD')
    );
  });

  it('should set product favorite', () => {
    const favorite = component.favorite;
    const favoriteBtnElement: HTMLElement | null = element.querySelector('.favorite-btn');

    favoriteBtnElement?.click();

    expect(component.favorite).toBe(!favorite);
  });

  it('should add product to cart', () => {
    const cartBtnElement: HTMLElement | null = element.querySelector('.cart-btn');

    cartBtnElement?.click();

    expect(cartStateService.addItem).toHaveBeenCalledWith(product);
  });
});
