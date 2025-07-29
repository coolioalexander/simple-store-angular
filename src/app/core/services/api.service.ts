import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private searchKeywordSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  setSearchKeyword(keyword: string | null) {
    this.searchKeywordSubject.next(keyword);
  }

  getProducts$() {
    const products$ = this.http.get<Product[]>('mocks/products.json');
    const searchKeyword$ = this.searchKeywordSubject.asObservable();

    return combineLatest([products$, searchKeyword$]).pipe(
      map(([products, searchKeyword]) => {
        const keyword = searchKeyword?.trim().toLowerCase();
        return keyword ? products.filter(p => p.name.toLowerCase().includes(keyword)) : products;
      })
    );
  }
}
