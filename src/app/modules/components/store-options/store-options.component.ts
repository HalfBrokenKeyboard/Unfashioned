import { Component} from '@angular/core';

@Component({
  selector: 'app-store-options',
  standalone: true,
  imports: [],
  templateUrl: './store-options.component.html',
  styleUrls: ['./store-options.component.scss']
})


export class StoreOptionsComponent {
  selectedOption: string; 
  colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'];
  sizes = ['Small', 'Medium', 'Large', 'XL'];
  selectedColor: string = '';
  selectedSize: string = '';
  selectedSort: string = 'priceLowToHigh';
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isSelectedOption(option: string): boolean {
    return this.selectedOption === option;
  }

  setSelectedOption(option: string | null) {
    this.selectedOption = option;
  }
}
