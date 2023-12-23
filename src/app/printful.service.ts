// printful-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrintfulService {
  private apiUrl = 'http://localhost:3000/api/printful'; // Adjust this to match your Vercel function endpoint

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  placeOrder(orderPayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/placeOrder`, orderPayload);
  }
}
