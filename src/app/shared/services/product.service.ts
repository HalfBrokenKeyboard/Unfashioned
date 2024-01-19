import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl; // Update to match your Vercel function endpoint
  private selectedProductKey = 'selectedProduct';
  private cartKey = 'cart';

  private selectedProduct = new BehaviorSubject<any>(this.loadSelectedProduct());
  currentProduct = this.selectedProduct.asObservable();

  private productID = new BehaviorSubject<number>(0);
  currentproductID = this.productID.asObservable();

  private cart = new BehaviorSubject<any[]>(this.loadCart());
  currentcart = this.cart.asObservable();

  constructor(private http: HttpClient) { }

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

  updateProductID(number: number) {
    this.productID.next(number);
  }

  getCart() {
    return this.cart.value;
  }

  addToCart(product: any) {
    const updatedCart = [...this.cart.value, product];
    this.cart.next(updatedCart);
    this.saveCart(updatedCart);
  }

  removeFromCart(productID: number) {
    const updatedCart = this.cart.value.filter((product) => product.id !== productID);  
    this.cart.next(updatedCart);
    this.saveCart(updatedCart);
  }

  private saveCart(cart: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  private loadCart(): any[] {
    const storedCart = localStorage.getItem(this.cartKey);
    
    if (storedCart) {
      try {
        // Attempt to parse the stored value as an array
        const parsedCart = JSON.parse(storedCart);
  
        if (Array.isArray(parsedCart)) {
          // Return the parsed array if it's a valid array
          return parsedCart;
        } else {
          // If the stored value is not an array, return an empty array
          console.error('Invalid cart data in localStorage. Expected an array.');
          return [];
        }
      } catch (error) {
        // If parsing fails, log an error and return an empty array
        console.error('Error parsing cart data from localStorage.', error);
        return [];
      }
    }
  
    // Return an empty array if there's no stored value
    return [];
  }
}
