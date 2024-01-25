import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from 'src/app/core/services/stripe.service';

@Component({
  selector: 'app-checkout-succes',
  standalone: true,
  imports: [],
  templateUrl: './checkout-succes.component.html',
  styleUrl: './checkout-succes.component.scss'
})
export class CheckoutSuccesComponent implements OnInit {
  sessionId: string;

  constructor(
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      this.initialize();
    });
  }

  async initialize(): Promise<void> {
    try {
      const response = await fetch(`/session-status?session_id=${this.sessionId}`);
      const session = await response.json();

      if (session.status === 'open') {
        this.router.navigate(['/checkout']);
      } else if (session.status === 'complete') {
        this.showSuccess(session.customer_email);
      }
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }


  showSuccess(customerEmail: string): void {
    // You can use Angular data binding to update your component's properties
    // and template to reflect the changes.
    console.log(customerEmail);
    
  }
}
