import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartModalStateService {
  private modalStateSubject = new BehaviorSubject<boolean>(false);

  getModalState() {
    return this.modalStateSubject.asObservable();
  }

  openModal() {
    this.modalStateSubject.next(true);
  }

  closeModal() {
    this.modalStateSubject.next(false);
  }
}
