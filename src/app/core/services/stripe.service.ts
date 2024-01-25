// stripe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment.prod';

declare module 'stripe' {
  interface Stripe {
    handleCardPayment(clientSecret: string): Promise<{ paymentIntent: any; error: any }>;
  }
}

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private apiUrl = environment.apiUrl; // Update to match your Vercel function endpoint

  constructor(private http: HttpClient, private productService: ProductService) {}
  private currectCart = this.productService.getCart();

  getSessionStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/stripe`);
  }
  createCheckoutSession() {
    return this.http.post(`${this.apiUrl}/api/stripe`, { cart: this.currectCart });
  }

  
}