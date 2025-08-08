import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { CartModalStateService } from '../../../core/services/cart-modal-state.service';
import { CartStateService } from '../../../core/services/cart-state.service';

describe('LayoutComponent', () => {
  let cartModalStateService: CartModalStateService;
  let cartStateService: CartStateService;
  let fixture: ComponentFixture<LayoutComponent>;
  let component: LayoutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        { provide: CartModalStateService, useValue: jasmine.createSpyObj('cartModalStateService', ['getModalState']) },
        { provide: CartStateService, useValue: jasmine.createSpyObj('cartStateService', ['getItems']) }
      ]
    }).compileComponents();

    cartModalStateService = TestBed.inject(CartModalStateService);
    cartStateService = TestBed.inject(CartStateService);
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should have modal closed on initialization', () => {
    component.cartModalState$.subscribe((state) => {
      expect(state).toBeFalse();
    });
  });
});
