import {Component, OnInit} from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoreModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
