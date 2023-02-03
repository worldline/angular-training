import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search-films'
  isLoggedIn = false

  onLogin(): void {
    this.isLoggedIn = true
  }
}
