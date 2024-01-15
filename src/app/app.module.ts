import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// keep 
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// delete
import { PrintfulService } from './shared/services/printful.service';
import { ProductService } from './shared/services/product.service';
import { StripeService } from './core/services/stripe.service';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule, 
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    CoreModule,
    ModulesModule,
  ],
  providers: [PrintfulService, ProductService, StripeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },],
  bootstrap: []
})
export class AppModule implements DoBootstrap {

  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(AppComponent);
  }
}
