import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  title = 'Authentication'
  email = ''
  password = ''
  @Output() loggedIn = new EventEmitter<void>()

  login() {
    this.loggedIn.emit()
  }
}
