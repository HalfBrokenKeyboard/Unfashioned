import { Component, OnInit } from '@angular/core';
import { PrintfulService } from '../printful.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit{
  products: any[];

  constructor(private printfulApiService: PrintfulService) {}
  
  ngOnInit() {
    this.getPrintfulProducts();
  }

  getPrintfulProducts() {
    this.printfulApiService.getProducts().subscribe({
      next: (response) => {
        this.products = response.result; // Adjust based on your Printful response structure
        console.log('Printful products:', this.products);
        // Handle the list of products as needed
      },
      error: (error) => {
        console.error('Error fetching Printful products:', error);
        // Handle the error as needed
      },
      complete: () => {
        // Optional: Handle completion if needed
      },
    });
  }

}
