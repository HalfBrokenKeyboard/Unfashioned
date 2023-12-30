import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { PrintfulService } from '../printful.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit{
  products: any[];

  constructor(
    private printfulService: PrintfulService, 
    private cdr: ChangeDetectorRef,
    private productService: ProductService){

  }

  ngOnInit(): void {
   this.fetchPrintfulProducts();
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: Event) {
  //   const scrollPosition = window.scrollY;
  // }

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
}
