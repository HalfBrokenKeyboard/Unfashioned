import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgClass, RouterLink, RouterLinkActive]
})
export class HeaderComponent implements OnInit{
  cartSize: number; 
  cart: any; 
  isCollapsed = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed
    console.log(this.isCollapsed);
    
  }


  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.productService.currentcart.subscribe(cart => {
      this.cart = cart;
      this.cartSize = this.cart ? this.cart.length : 0;
    });
  }

}
