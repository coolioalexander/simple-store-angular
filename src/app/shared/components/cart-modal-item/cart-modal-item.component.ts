import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-cart-modal-item',
  imports: [NgOptimizedImage, CurrencyPipe, NgIcon],
  providers: [provideIcons({ heroTrash })],
  templateUrl: './cart-modal-item.component.html',
  styleUrl: './cart-modal-item.component.css'
})
export class CartModalItemComponent {

}
