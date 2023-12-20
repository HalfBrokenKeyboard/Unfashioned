import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
 { path: '', component: HomepageComponent},
 { path: 'store', component: StoreComponent}, 
 { path: 'contact', component: ContactComponent}, 
 { path: 'checkout', component: CheckoutComponent}, 
 { path: 'product', component: ProductComponent}, 
 { path: 'login', component: LoginComponent}, 
 // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
