import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormate'
})
export class DateFormatePipe implements PipeTransform {

  transform(value: Date): string {
    const data = value.toString().split('-');
    return `${data[2]}/${data[1]}/${data[0]}`;
  }

}
