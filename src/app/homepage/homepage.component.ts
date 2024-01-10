import { ChangeDetectorRef, Component, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { PrintfulService } from '../printful.service';
import { ProductService } from '../product.service';
import { forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit{
  products: any[];
  productsInformations: any[] = [];

  selectedProduct: any;
  
  constructor(
    private printfulService: PrintfulService, 
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    @Inject(DOCUMENT) private document: Document){}

  ngOnInit(): void {
    this.loadGoogleMapsScript();
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
    this.fetchPrintfulProducts();

   document.addEventListener('scroll', function () {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const scalingSection = document.getElementById('scalingSection');
  
    if (scrollPercentage > 50) {
      scalingSection.classList.add('scaling');
    } else {
      scalingSection.classList.remove('scaling');
    }
  });
  }

  fetchPrintfulProducts(): void {
    this.printfulService.getProducts().subscribe({
      next: (data) => {
          this.products = this.filterProducts(data.result);  // Apply filtering
          this.updateView();
      },
      error: (error) => {
        console.error('Error fetching Printful products:', error);
      },
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

  private filterProducts(originalProducts: any[]): any[] {
    // Example: Filter products based on a condition (e.g., only show products with a certain price)
    return originalProducts.filter(product => product.name == "Chains of toxicity tee");
  }

  setSelectedProduct(product) {
    this.productService.setProduct(product);
  }

  private loadGoogleMapsScript(): void {
    const script = this.document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDL4xvuOAZh5WCLOmh-fBmDTKQxNDh2c8I&callback=initMap`;
    script.async = false;
    script.defer = false;
  
    // Append the script to the document body
    this.document.body.appendChild(script);
  }
}
