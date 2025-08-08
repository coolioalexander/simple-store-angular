import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

import products from '../../../assets/mocks/products.json' assert { type: 'json' };
import filteredProducts from '../../../assets/mocks/filtered-products.json' assert { type: 'json' };

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return all products', () => {
    service.getProducts().subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBe(2);
      expect(products).toEqual(products);
    });

    httpTestingController.expectOne({ method: 'GET', url: 'data/products.json' })
      .flush(products);
  });

  it('should return filtered products on search', () => {
    service.setSearchKeyword('Sony');

    service.getProducts().subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBe(1);
      expect(products).toEqual(products);
    });

    httpTestingController.expectOne({ method: 'GET', url: 'data/products.json' })
      .flush(filteredProducts);
  });
});
