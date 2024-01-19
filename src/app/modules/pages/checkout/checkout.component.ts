import { Component, OnDestroy, OnInit, WritableSignal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AddressComponent } from '../../components/address/address.component';
import { CheckoutSuccesComponent } from '../../components/checkout-succes/checkout-succes.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, LoginComponent, AddressComponent, CheckoutSuccesComponent, ConfirmComponent, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit  {
  checkout: any; 
  step: string;
  steps: string[] = ['payment', 'confirm', 'done'];
  currentUrl: WritableSignal<string> = signal<string>(window.location.href);
  
  

  constructor(
    private route: ActivatedRoute
    ){
      effect(() => {
        let url = this.currentUrl()
        console.log(url);
        this.determineStepFromUrl(url);
      });
    }

    ngOnInit() {
    }

    isStepCompleted(targetStep: string): boolean {
      const currentIndex = this.steps.indexOf(this.step);
      const targetIndex = this.steps.indexOf(targetStep);
  
      return currentIndex >= targetIndex;
    }
    
    private determineStepFromUrl(url: string) {
      // Logic to determine step based on the URL
      if (url.includes('/checkout/payment')) {
        this.step = 'payment';
      } else if (url.includes('/checkout/confirm')) {
        this.step = 'confirm';
      } else if (url.includes('/checkout/done')) {
        this.step = 'done';
      }
    }

    
  }

