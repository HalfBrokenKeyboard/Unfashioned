import { Component, ChangeDetectorRef, OnInit, NgModule } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PrintfulService } from '../printful.service';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @NgModule({
    imports: [
      // Other modules...
      CommonModule,
    ],
    // Other configurations...
  })
  placeholders: [1, 2, 3];

  products: any[] = [];
  productsInformations: any[];

  selectedProduct: any;

  constructor(
    private printfulService: PrintfulService,
    private cdr: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
    this.fetchPrintfulProducts();
  }

  fetchPrintfulProducts(): void {
    this.printfulService.getProducts().subscribe({
      next: (data) => {
        this.products = data.result;
        this.fetchSyncProductsInformation();
      },
      error: (error) => {
        console.error('Error fetching Printful products:', error);
      }
    });
  }

  fetchSyncProductsInformation(): void {
    const observables = this.products.map(product => this.printfulService.getSyncProduct(product.id));

    forkJoin(observables).subscribe(
      (variantDataArray) => {
        this.productsInformations = variantDataArray.map(data => data.result);
        this.updateView();
      },
      (error) => {
        console.error('Error fetching Printful product information:', error);
      }
    );
  }

  updateView() {
    this.cdr.detectChanges();
  }

  setSelectedProduct(product) {
    this.productService.setProduct(product);
  }

  addToCart(product) {
    this.productService.addToCart(product);
  }
}
