import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ApiService } from '../../core/services/api.service';
import { of } from 'rxjs';

import expectedProducts from '../../../assets/mocks/products.json' assert { type: 'json' };

describe('HomeComponent', () => {
  let apiService: ApiService;
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getProducts']);
    apiServiceSpy.getProducts.and.returnValue(of(expectedProducts));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should return expected products', () => {
    expect(apiService.getProducts).toHaveBeenCalled();
    component.products$.subscribe(products => {
      expect(products).toEqual(expectedProducts);
    });
  });
});
