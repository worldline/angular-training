import { Component } from '@angular/core'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { FilmSearchComponent } from './components/film-search/film-search.component'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loggedIn = false

  onLogin(): void {
    this.loggedIn = true
  }
}
