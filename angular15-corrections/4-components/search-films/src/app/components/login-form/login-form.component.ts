import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  title = 'Authentication'
  email = ''
  password = ''
  @Output() loggedIn = new EventEmitter<void>()

  login(): void {
    this.loggedIn.emit()
  }
}
