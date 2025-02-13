import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FilmComponent } from '@components/film/film.component'
import { Film } from '@models/film'
import { FilmService } from '@services/film.service'

@Component({
  selector: 'app-film-search',
  imports: [FormsModule, FilmComponent],
  templateUrl: './film-search.component.html',
  styleUrl: './film-search.component.scss'
})
export class FilmSearchComponent {
  films: Film[] = []

  constructor(
    private filmService: FilmService
  ) {}

  searchFilms(title: string): void {
    this.filmService.search(title)
      .subscribe(films => this.films = films)
  }
}
