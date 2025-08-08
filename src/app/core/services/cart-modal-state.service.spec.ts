import { TestBed } from '@angular/core/testing';

import { CartModalStateService } from './cart-modal-state.service';

describe('CartModalStateService', () => {
  let service: CartModalStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartModalStateService);
  });

  it('should be false on initialization', () => {
    service.getModalState().subscribe(state => {
      expect(state).toBeFalse();
    });
  });

  it('should be true on modal opened', () => {
    service.openModal();

    service.getModalState().subscribe(state => {
      expect(state).toBeTrue();
    });
  });

  it('should be false on modal closed', () => {
    service.closeModal();

    service.getModalState().subscribe(state => {
      expect(state).toBeFalse();
    });
  });
});
