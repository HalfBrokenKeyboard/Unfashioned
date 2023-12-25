// printful-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrintfulService {
  private apiUrl = environment.apiUrl; // Update to match your Vercel function endpoint

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getVariants(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?endpoint=store/variants/${id}`);
  }
}
