import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartModalService {
  private modalShownSubject = new BehaviorSubject<boolean>(false);
  
  getModalShown$() {
    return this.modalShownSubject.asObservable();
  }
  
  showModal() {
    this.modalShownSubject.next(true);
  }
  
  hideModal() {
    this.modalShownSubject.next(false);
  }
}
