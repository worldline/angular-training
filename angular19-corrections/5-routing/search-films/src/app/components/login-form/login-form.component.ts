import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

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

  constructor(
    private router: Router
  ) {}

  login() {
    this.router.navigateByUrl('/search')
  }
}
