// stripe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private apiUrl = environment.apiUrl; // Update to match your Vercel function endpoint

  constructor(private http: HttpClient) {}

  createCheckoutSession() {
    return this.http.post(`${this.apiUrl}/api/create-checkout-session`, {});
  }
}
