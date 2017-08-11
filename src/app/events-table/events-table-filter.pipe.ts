import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'lodash';


@Pipe({
  name: 'eventsTableFilter'
})
export class EventsTableFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
      const castration = function( input: string ): string {
        return input.replace(/[^\w]+/g, '').toLowerCase();
      };

      if ( query ) {
        return filter(array, row => castration(row.title).indexOf(castration(query)) > -1);
      }
    return array;
  }

}
