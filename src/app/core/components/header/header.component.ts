import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  cartSize: number; 
  cart: any; 

  isHeaderTransparent = false;

  

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.productService.currentcart.subscribe(cart => {
      this.cart = cart;
      this.cartSize = this.cart ? this.cart.length : 0;
    });
  }

  @HostListener('window:scroll', [])
    onscroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isHeaderTransparent = scrollPosition > 50;    
    }
}
