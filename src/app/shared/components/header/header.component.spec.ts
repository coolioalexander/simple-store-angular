import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CartModalStateService } from '../../../core/services/cart-modal-state.service';
import { CartStateService } from '../../../core/services/cart-state.service';
import { ApiService } from '../../../core/services/api.service';
import { of } from 'rxjs';
import cartItems from '../../../../assets/mocks/cart-items.json';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let cartModalStateService: CartModalStateService;
  let cartStateService: CartStateService;
  let apiService: ApiService;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const cartModalStateServiceSpy = jasmine.createSpyObj('cartModalStateService', ['openModal']);
    const cartStateServiceSpy = jasmine.createSpyObj('cartStateService', ['getItems']);
    const apiServiceSpy = jasmine.createSpyObj('apiService', ['setSearchKeyword']);
    cartStateServiceSpy.getItems.and.returnValue(of(cartItems));

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: CartModalStateService, useValue: cartModalStateServiceSpy },
        { provide: CartStateService, useValue: cartStateServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    cartModalStateService = TestBed.inject(CartModalStateService);
    cartStateService = TestBed.inject(CartStateService);
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(HeaderComponent);

    fixture.detectChanges();
  });

  it('should get cart count in badge', () => {
    expect(fixture.nativeElement.querySelector('.count-badge')?.textContent).toBe(cartItems.length.toString());
  });

  it('should filter products on search', () => {
    const keyword = 'watch';
    const searchInputElement = fixture.debugElement.query(By.css('.search-input'));
    searchInputElement.nativeElement.value = keyword;

    searchInputElement.triggerEventHandler('keyup');

    expect(apiService.setSearchKeyword).toHaveBeenCalledWith(keyword);
  });
});
