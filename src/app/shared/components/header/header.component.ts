import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingCart, heroUser } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-header',
  imports: [NgIcon],
  providers: [provideIcons({ heroShoppingCart, heroUser })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

public onCartHover() {
  
}
}
