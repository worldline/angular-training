import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Search Films'
  orderReference = 'ABCXYZ'
  price = 17.3

  isLoggedIn = false

  onLoggingIn(): void {
    this.isLoggedIn = true
  }
}
