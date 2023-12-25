import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private selectedProductKey = 'selectedProduct';
  private selectedProduct = new BehaviorSubject<any>(this.loadSelectedProduct());
  currentProduct = this.selectedProduct.asObservable();

  constructor() { }

  setProduct(product) {
    this.selectedProduct.next(product);
    this.saveSelectedProduct(product);
  }

  private saveSelectedProduct(product) {
    localStorage.setItem(this.selectedProductKey, JSON.stringify(product));
  }

  private loadSelectedProduct() {
    const storedProduct = localStorage.getItem(this.selectedProductKey);
    return storedProduct ? JSON.parse(storedProduct) : null;
  }
}
