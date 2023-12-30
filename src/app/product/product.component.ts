import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrintfulService } from '../printful.service';
import { ProductService } from '../product.service';
import { SizeGuideModalComponent } from '../size-guide-modal/size-guide-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  variant: any;
  productInformation: any;
  productSizes: any; 

  selectedProduct: any;
  selectedSize: string;

  constructor(private printfulService: PrintfulService, private cdr: ChangeDetectorRef, private productService: ProductService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.productService.currentProduct.subscribe(product => {
      this.selectedProduct = product;
      if (this.selectedProduct) {
        this.loadData();
      }
    });
  }
  
  loadData(): void {
    this.printfulService.getSyncProduct(this.selectedProduct.id).subscribe({
      next: (variantData) => {
        this.variant = variantData;
        this.updateView();
      },
      error: (error) => {
        console.error('Error fetching Printful products:', error);
      },
      complete: () => {
        if (this.variant) {          
          this.fetchProductInformation(this.variant.result.sync_variants[0].product.product_id);
        } else {
          console.log("What you say to me you little shit");
        }
      }
    });
  }

  fetchProductInformation(productID): void {  
    this.printfulService.getProductInformation(productID).subscribe({
      next: (data) => {
        this.productInformation = data;
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

  setSelectedSize(size: string) {
    this.selectedSize = size;
  }

  openSizeGuide() {
    if (this.variant) {
      this.productService.updateProductID(this.variant.result.sync_variants[0].product.product_id)
      this.modalService.open(SizeGuideModalComponent);
    }
  }
}
