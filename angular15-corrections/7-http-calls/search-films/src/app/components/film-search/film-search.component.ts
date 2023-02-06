import { Component } from '@angular/core'
import { Film } from '@models/film'
import { FilmService } from '@services/film.service'

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.scss']
})
export class FilmSearchComponent {
  films: Film[] = []

  constructor(
    private filmService: FilmService
  ) {}

  searchFilms(title: string) {
    this.filmService.search(title)
      .subscribe({
        next: films => this.films = films
      })
  }
}
