import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { StoreOptionsComponent } from '../../components/store-options/store-options.component';
import { PrintfulService } from 'src/app/shared/services/printful.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationDirective } from 'src/app/shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-store',
  standalone: true, 
  imports: [StoreOptionsComponent, CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  placeholders: [1, 2, 3];
  products: any[] = [];
  productsInformations: any[];
  selectedProduct: any;
  loading: boolean = true; // Add loading indicator

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
        this.loading = false; // Set loading to false in case of an error
      }
    });
  }

  fetchSyncProductsInformation(): void {
    const observables = this.products.map(product => this.printfulService.getSyncProduct(product.id));

    forkJoin(observables).subscribe(
      (variantDataArray) => {
        this.productsInformations = variantDataArray.map(data => data.result);
        this.updateView();
        this.loading = false; // Set loading to false when data is available
      },
      (error) => {
        console.error('Error fetching Printful product information:', error);
        this.loading = false; // Set loading to false in case of an error
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
