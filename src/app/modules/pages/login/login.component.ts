import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() stepChange: EventEmitter<string> = new EventEmitter<string>();

  onSignIn(event: Event) {
  // Perform sign-in logic
  event.preventDefault();
  // Emit the value to the parent component
  this.stepChange.emit('address');
}
}
