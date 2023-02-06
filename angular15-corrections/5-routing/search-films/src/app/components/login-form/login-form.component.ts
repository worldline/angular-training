import { Component, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'

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

  constructor(
    private router: Router
  ) {}

  login(): void {
    this.router.navigate(['search'])
  }
}
