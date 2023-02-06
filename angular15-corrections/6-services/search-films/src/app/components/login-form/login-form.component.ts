import { Component, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'

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
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  login(): void {
    this.authenticationService.onLogin()
    this.router.navigate(['search'])
  }
}
