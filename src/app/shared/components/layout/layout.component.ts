import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CartModalComponent } from "../cart-modal/cart-modal.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, CartModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
