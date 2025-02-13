import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  logout(): void {
    this.authenticationService.logout()
    this.router.navigateByUrl('/login')
  }

  get loggedIn(): boolean {
    return this.authenticationService.loggedIn
  }
}
