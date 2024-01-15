import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrintfulService } from '../../../shared/services/printful.service';
import { ProductService } from '../../../shared/services/product.service';
import { SizeGuideModalComponent } from '../size-guide-modal/size-guide-modal.component';
import { NgbDropdown, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true, 
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [NgbDropdown], 
})
export class ProductComponent implements OnInit {
  variant: any;
  productInformation: any;
  
  selectedProduct: any;
  selectedVariant: any; 
  selectedSize: string;

  constructor(private printfulService: PrintfulService, private cdr: ChangeDetectorRef, private productService: ProductService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.productService.currentProduct.subscribe(product => {
      this.selectedProduct = product;
      if (this.selectedProduct) {
        this.fetchProductInformation(this.selectedProduct.sync_variants[0].product.product_id);
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

  setSelectVariant(variant: any) {
    this.selectedVariant = variant; 
  }

  addToCart(product) {
    if (this.selectedSize) {
      this.productService.addToCart(product);
    }
  } 

  openDropdown(dropdown: NgbDropdown): void {
    if (dropdown) {
      dropdown.open();
    }
  }

  openSizeGuide() {
    if (this.variant) {
      this.productService.updateProductID(this.variant.result.sync_variants[0].product.product_id)
      this.modalService.open(SizeGuideModalComponent);
    }
  }
}
