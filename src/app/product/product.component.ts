import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrintfulService } from '../printful.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  selectedProduct: any;
  variant: any;
  

  constructor(private printfulService: PrintfulService,  private cdr: ChangeDetectorRef, private productService: ProductService){}

  ngOnInit(): void {
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
    if (this.selectedProduct) {
       this.fetchPrintfulVariant(this.selectedProduct.external_id);
       console.log(this.variant);
    }
  }


  fetchPrintfulVariant(id): void {
    this.printfulService.getVariants(id).subscribe({
      next: (data) => {
        this.variant = data;
  
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
}
