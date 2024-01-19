import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES),
  ]
});
