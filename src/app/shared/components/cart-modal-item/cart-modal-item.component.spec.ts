import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModalItemComponent } from './cart-modal-item.component';

describe('CartModalItemComponent', () => {
  let component: CartModalItemComponent;
  let fixture: ComponentFixture<CartModalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartModalItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartModalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
