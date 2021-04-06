import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: unknown): any {
    switch (value) {
      case 'M':
        return 'Masculino';
      case 'W':
        return 'Femenino';
    }
  }
}
