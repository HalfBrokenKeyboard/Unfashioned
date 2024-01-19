import { RouterModule, Routes } from '@angular/router';


import { AccountComponent } from './modules/pages/account/account.component';
import { CartComponent } from './modules/pages/cart/cart.component';
import { CheckoutFailedComponent } from './modules/components/checkout-failed/checkout-failed.component';
import { CheckoutSuccesComponent } from './modules/components/checkout-succes/checkout-succes.component';
import { ContactComponent } from './modules/pages/contact/contact.component';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { PrivacyComponent } from './modules/pages/privacy/privacy.component';
import { ProductComponent } from './modules/pages/product/product.component';
import { SavedComponent } from './modules/pages/saved/saved.component';
import { StoreComponent } from './modules/pages/store/store.component';
import { TermsofserviceComponent } from './modules/pages/termsofservice/termsofservice.component';
import { PageNotFoundComponent } from './modules/pages/page-not-found/page-not-found.component';
import { CheckoutComponent } from './modules/pages/checkout/checkout.component';
import { StoryComponent } from './modules/pages/story/story.component';
import { NgModule } from '@angular/core';
import { PaymentComponent } from './modules/components/payment/payment.component';
import { ConfirmComponent } from './modules/pages/confirm/confirm.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'store', component: StoreComponent }, 
    { path: 'contact', component: ContactComponent }, 
    { path: 'product', component: ProductComponent }, 
    { path: 'cart', component: CartComponent }, 

    // { path: 'login', component: LoginComponent }, 
    // { path: 'account', component: AccountComponent },
    // { path: 'saved', component: SavedComponent },

    { path: 'terms', component: TermsofserviceComponent },
    { path: 'privacy', component: PrivacyComponent },
    { 
      path: 'checkout', 
      component: CheckoutComponent, 
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'payment' },
        { path: 'payment', component: PaymentComponent, data: { step: 'payment' } },
        { path: 'confirm', component: ConfirmComponent, data: { step: 'confirm' } },
        { path: 'done', component: CheckoutSuccesComponent, data: { step: 'done' } },
      ]
    },
    { path: 'canceled', component: CheckoutFailedComponent},
    { path: 'story', component: StoryComponent},
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
   ];
   
   @NgModule({
     imports: [RouterModule.forRoot(routes, {enableViewTransitions: true})],
     exports: [RouterModule]
   })
   export class AppRoutingModule { 
   
   }