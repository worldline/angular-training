import { Component, Input } from '@angular/core'
import { Film } from '@models/film'

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent {
  @Input() film!: Film

  rating(film: Film): string {
    const starNumber = Math.ceil(Number(film.metascore) / 20)
    return '★'.repeat(starNumber)
  }
}
