// stripe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
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

  createCheckoutSession() {
    return this.http.post(`${this.apiUrl}/api/stripe`, { cart: this.currectCart });
  }

  
}