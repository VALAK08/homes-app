import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceSort',
  standalone: true
})
export class PriceSortPipe implements PipeTransform {
  transform(items: any[], order: string = 'asc'): any[] {
    const sortedItems = items.sort((a, b) => a.price - b.price);
    return order === 'desc' ? sortedItems.reverse() : sortedItems;
  }
}
