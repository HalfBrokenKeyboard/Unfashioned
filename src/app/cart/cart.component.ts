import { Component } from '@angular/core';
import { StripeService } from '../stripe.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private stripeService: StripeService){

  }

  createCheckoutSession() {
    this.stripeService.createCheckoutSession().subscribe(
      (session: any) => {
        // Redirect to the session URL or handle as needed
        window.location.href = session.url;
      },
      (error) => {
        console.error('Error creating checkout session:', error);
      }
    );
  }
}
