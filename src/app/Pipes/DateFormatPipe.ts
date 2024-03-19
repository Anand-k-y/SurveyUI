import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string|null {
    if (value) {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss');
    }
    return '';
  }
}
