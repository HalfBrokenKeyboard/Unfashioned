import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { StoreComponent } from './store/store.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { StoreOptionsComponent } from './store-options/store-options.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { PrintfulService } from './printful.service';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { SavedComponent } from './saved/saved.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    StoreComponent,
    HomepageComponent,
    ContactComponent,
    CheckoutComponent,
    LoginComponent,
    StoreOptionsComponent,
    ProductComponent,
    CartComponent,
    AccountComponent,
    SavedComponent,
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [PrintfulService],
  bootstrap: [AppComponent]
})
export class AppModule { }
