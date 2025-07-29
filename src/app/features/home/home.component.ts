import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ApiService } from '../../core/services/api.service';
import { Observable, of } from 'rxjs';
import { Product } from '../../shared/models/product';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[] | undefined> = of(undefined); 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.products$ = this.apiService.getProducts$();
  }
}
