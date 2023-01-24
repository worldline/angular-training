import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(metascore: string): string {
    const starNumber = Math.ceil(Number(metascore) / 20)
    return '★'.repeat(starNumber)
  }

}
