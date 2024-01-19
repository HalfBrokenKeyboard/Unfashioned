import { Component, OnInit} from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './shared/services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppComponent, HeaderComponent, FooterComponent, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  providers:[ProductService],
})

export class AppComponent implements OnInit{
  loading: boolean;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }
  
  ngOnInit(): void {
  }

}
