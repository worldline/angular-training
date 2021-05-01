import { Component } from '@angular/core'
import { Film } from '@models/film'
import { FilmService } from 'src/app/services/film.service'

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.scss']
})
export class FilmSearchComponent {
  films: Film[] = []
  title = ''

  constructor(private filmService: FilmService) {}

  searchFilms(): void {
    this.filmService.search(this.title)
      .subscribe(films => this.films = films)
  }
}
