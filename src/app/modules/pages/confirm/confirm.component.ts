import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  @Output() stepChange: EventEmitter<string> = new EventEmitter<string>();

  onContinueShopping() {
    // Handle the action when the user wants to continue shopping
    this.stepChange.emit('done');
  }

  onCancelOrder() {
    // Handle the action when the user wants to cancel the order
    console.log('Cancel order clicked');
    // You can navigate the user to another page, show a confirmation modal, or perform other actions as needed
  }
}
