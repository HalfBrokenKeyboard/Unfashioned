import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AddressComponent } from '../address/address.component';
import { CheckoutSuccesComponent } from '../checkout-succes/checkout-succes.component';
import { StripeService } from '../stripe.service';
import Stripe from 'stripe';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-checkout-steps',
  standalone: true,
  imports: [CommonModule, LoginComponent, AddressComponent, CheckoutSuccesComponent, ConfirmComponent],
  templateUrl: './checkout-steps.component.html',
  styleUrl: './checkout-steps.component.scss',
})
export class CheckoutStepsComponent implements OnInit {
  stripe: any;
  step: string;
  steps: string[];

  constructor(private http: HttpClient, private stripeService: StripeService) {
    this.steps = ['login', 'address', 'payment', 'confirm', 'done'];
    this.step = this.getStoredStep() || this.steps[0]; // Retrieve stored step or default to the first step
  }

  ngOnInit() {}

  ngOnDestroy() {
    // Clear the stored step in localStorage when the component is destroyed
    localStorage.removeItem('checkoutStep');
  }

  onStepChange(step: string) {
    // Handle the emitted value (step) here
    if (step == 'payment') {
      this.createCheckoutSession();
      this.step = 'confirm';
    } else {
      this.step = step;
    }

    // Store the current step in localStorage
    this.storeStep();
  }

  createCheckoutSession() {
    this.stripeService.createCheckoutSession().subscribe({
      next: (session: any) => {
        // Redirect to the session URL or handle as needed
        window.location.href = session.url;
      },
      error: (error) => {
        console.error('Error creating checkout session:', error);
      },
    });
  }

  private storeStep() {
    // Store the current step in localStorage
    localStorage.setItem('checkoutStep', this.step);
  }

  private getStoredStep(): string | null {
    // Retrieve the stored step from localStorage
    return localStorage.getItem('checkoutStep');
  }

  isStepCompleted(targetStep: string): boolean {
    const currentIndex = this.steps.indexOf(this.step);
    const targetIndex = this.steps.indexOf(targetStep);

    return currentIndex >= targetIndex;
  }

}
