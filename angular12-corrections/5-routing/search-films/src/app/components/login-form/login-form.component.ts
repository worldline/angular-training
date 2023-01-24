import { Component } from '@angular/core'
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

  constructor(
    private router: Router
  ) {}

  logIn(): void {
    this.router.navigate(['/search'])
  }

}
