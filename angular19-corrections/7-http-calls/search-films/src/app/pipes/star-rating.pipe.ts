import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(metascore: number): string {
    return '⭐'.repeat(Math.round(metascore / 20))
  }
}
