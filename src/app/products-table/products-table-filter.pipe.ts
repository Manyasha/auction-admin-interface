import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'lodash';


@Pipe({
  name: 'productsTableFilter'
})
export class ProductsTableFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    const trim = function( input: string ): string {
      return input && input.toString().replace(/[^\w]+/g, '').toLowerCase();
    };

    if ( query ) {
      const q = trim(query);
      return filter(array, row => trim(row.title).indexOf(q) > -1 ||
              trim(row.sku).indexOf(q) > -1
      );
    }
    return array;
  }
}
