import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { CartModalItemComponent } from "../cart-modal-item/cart-modal-item.component";

@Component({
  selector: 'app-cart-modal',
  imports: [NgIcon, CartModalItemComponent],
  providers: [provideIcons({ heroXMark })],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {

}
