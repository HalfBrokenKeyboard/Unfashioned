import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintfulService } from '../printful.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-size-guide-modal',
  standalone: true,
  imports: [],
  templateUrl: './size-guide-modal.component.html',
  styleUrl: './size-guide-modal.component.scss'
})
export class SizeGuideModalComponent implements OnInit {
  productSizes: any;
  
  constructor(public activeModal: NgbActiveModal, private printfulService: PrintfulService, private cdr: ChangeDetectorRef, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.currentproductID.subscribe((productID) => {
      this.fetchProductSizes(productID);      
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  fetchProductSizes(productID): void {  
    this.printfulService.getProductSizes(productID).subscribe({
      next: (data) => {
        this.productSizes = data;
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
