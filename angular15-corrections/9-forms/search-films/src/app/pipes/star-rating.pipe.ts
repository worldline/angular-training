import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(metascore: string): string {
    return '★'.repeat(Math.ceil(+metascore / 20))
  }

}
