import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PrintfulService } from '../printful.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit{
  products: any[];
  selectedProduct: any; 

  constructor(
    private printfulService: PrintfulService, 
    private cdr: ChangeDetectorRef,
    private productService: ProductService) {}
  
  ngOnInit() {
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product)
    this.fetchPrintfulProducts();
  }

  fetchPrintfulProducts(): void {
    this.printfulService.getProducts().subscribe({
      next: (data) => {
        this.products = data.result;
  
        this.updateView();
      },
      error: (error) => {
        console.error('Error fetching Printful products:', error);
      },
    });
  }
  
  updateView() {
    this.cdr.detectChanges();
  }

  setSelectedProduct(product) {
    this.productService.setProduct(product);
  }
  
}
