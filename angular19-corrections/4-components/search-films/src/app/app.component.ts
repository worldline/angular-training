import { Component } from '@angular/core'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { FilmSearchComponent } from './components/film-search/film-search.component'

@Component({
  selector: 'app-root',
  imports: [LoginFormComponent, FilmSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loggedIn = false

  onLogin(): void {
    this.loggedIn = true
  }
}
