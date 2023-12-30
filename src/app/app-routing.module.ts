import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProductComponent } from './product/product.component';
import { SavedComponent } from './saved/saved.component';
import { StoreComponent } from './store/store.component';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';

const routes: Routes = [
 { path: '', component: HomepageComponent },
 { path: 'store', component: StoreComponent }, 
 { path: 'contact', component: ContactComponent }, 
 { path: 'checkout', component: CheckoutComponent }, 
 { path: 'product', component: ProductComponent }, 
 { path: 'cart', component: CartComponent }, 
 { path: 'login', component: LoginComponent }, 
 { path: 'account', component: AccountComponent },
 { path: 'saved', component: SavedComponent },
 { path: 'terms', component: TermsofserviceComponent },
 { path: 'privacy', component: PrivacyComponent }
 // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableViewTransitions: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}