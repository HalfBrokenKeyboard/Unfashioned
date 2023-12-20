import { Component} from '@angular/core';

@Component({
  selector: 'app-store-options',
  templateUrl: './store-options.component.html',
  styleUrls: ['./store-options.component.scss']
})


export class StoreOptionsComponent {
  colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'];
  sizes = ['Small', 'Medium', 'Large', 'XL'];
  selectedColor: string = '';
  selectedSize: string = '';
  selectedSort: string = 'priceLowToHigh';
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
