import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PrintfulService } from '../../../shared/services/printful.service';
import { ProductService } from '../../../shared/services/product.service';
import { forkJoin } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MapComponent } from '../../components/map/map.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ScrollAnimationDirective } from 'src/app/shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-homepage',
  standalone: true, 
  imports: [MapComponent, CommonModule, RouterOutlet, ScrollAnimationDirective, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  private scriptElement: HTMLScriptElement;
  products: any[] = [];
  productsInformations: any[];

  selectedProduct: any;
  
  constructor(
    private printfulService: PrintfulService, 
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    @Inject(DOCUMENT) private document: Document){
      // this.loadGoogleMapsScript();
    }
  

    ngOnInit() {
      this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
      this.fetchPrintfulProducts();
    }

    ngOnDestroy(): void {
      if (this.scriptElement && this.scriptElement.src.includes('https://maps.googleapis.com')) {
      this.document.body.removeChild(this.scriptElement);
    }
    }
  
    fetchPrintfulProducts(): void {
      this.printfulService.getProducts().subscribe({
        next: (data) => {
          this.products = this.filterProducts(data.result);
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
  
  filterProducts(originalProducts: any[]): any[] {
    // Example: Filter products based on a condition (e.g., only show products with a certain price)
    return originalProducts.filter(product => product.name == "Chains of toxicity tee");
  }
  private loadGoogleMapsScript(): void {
    this.scriptElement = this.document.createElement('script');
    this.scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDL4xvuOAZh5WCLOmh-fBmDTKQxNDh2c8I`;
    this.scriptElement.async = false;
    this.scriptElement.defer = false;
  
    // Append the script to the document body
    this.document.body.appendChild(this.scriptElement);
  }
}
