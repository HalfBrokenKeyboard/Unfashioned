import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { StripeService } from '../../../core/services/stripe.service';
import { ProductService } from '../../../shared/services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cart: any; 

  constructor(private stripeService: StripeService, private productService: ProductService){}

  ngOnInit(): void {
    this.productService.currentcart.subscribe(cart => {
      this.cart = cart;    
    });
    this.cart.forEach(value => {
      console.log(value);
    });
  }

  createCheckoutSession() {
    this.stripeService.createCheckoutSession().subscribe({
      next: (session: any) => {
        // Redirect to the session URL or handle as needed
        window.location.href = session.url;
        
      },
      error: (error) => {
        console.error('Error creating checkout session:', error);
      }
    });
  }

  removeFromCart(productID: any) {
    this.productService.removeFromCart(productID);
  }

  isProductRepeated(product: any): boolean {
    // Check if the product with the same ID exists before the current index
    const index = this.cart.indexOf(product);
    return this.cart.slice(0, index).some(p => p.variant_id === product.variant_id && p.id === product.id);
  }

  getQuantity(product: any): number {
    // Count the occurrences of the current product in the cart
    return this.cart.filter(p => p.id === product.id).length;
  }

  getCartTotal(): number {
    let sum = 0; // Initialize sum to 0
    this.cart.forEach(product => {
      sum = sum + parseFloat(product.retail_price); // Assuming retail_price is a string, parse it to a float
    });
    return sum;
  }

  getCartVat(): number {
    const vatRate = 25 / 100; // VAT rate for
    return Math.round(this.getCartTotal() * vatRate) 
  }

}
