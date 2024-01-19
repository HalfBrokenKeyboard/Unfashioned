import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StripeService } from 'src/app/core/services/stripe.service';

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  stripe = new Stripe('pk_test_51OOZEzCQhkYR2Pl36a7bSZzUHnVvW5947gxcIsj8YpSw06jZiAYsOK2Bjw6SJ9LhpU8R1rHCVSQs6qdyi8coAZHK00cM7VCdnO');    
  checkout: any;

  constructor(
    private stripeService: StripeService
  ){}

  ngOnInit(): void {
    this.initializeCheckout();
  }

  ngOnDestroy() {
    this.checkout.destroy();
  }

  async initializeCheckout() {
    try {
      this.stripeService.createCheckoutSession().subscribe({
      next: async (session: any) => {
        const { clientSecret } = session;
        this.checkout = await this.stripe.initEmbeddedCheckout({ clientSecret: clientSecret });

        // Mount Checkout
        this.checkout.mount('#checkout');
      },
      error: (error) => {
        console.error('Error initializing Checkout:', error);
      },
    });
    } catch (error) {
      console.error('Error initializing Checkout:', error);
    }
  }

}
