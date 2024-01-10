import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  cartSize: number; 
  cart: any; 

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.productService.currentcart.subscribe(cart => {
      this.cart = cart;
      this.cartSize = this.cart ? this.cart.length : 0;
    });
  }
}
