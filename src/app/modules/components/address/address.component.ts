import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  @Output() stepChange: EventEmitter<string> = new EventEmitter<string>();

  onSubmit(event: Event) {
    // Perform sign-in logic
    event.preventDefault();
    // Emit the value to the parent component
    this.stepChange.emit('payment');
  }
}
