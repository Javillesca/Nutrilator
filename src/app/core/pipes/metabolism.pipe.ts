import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metabolism'
})
export class MetabolismPipe implements PipeTransform {
  transform(value: string): any {

    const results = [
      'Actividad física',
      'Poco o ningún ejercicio',
      'Ligera (1-3 días de ejericio semanal)',
      'Moderada (3-5 días de ejercicio semanal)',
      'Fuerte (6-7 días de ejercicio semanal)',
      'Muy fuerte (dos veces al día / entrenamientos muy duros)'
    ];
    switch (value) {
      case '':
        return results[0];
      case 'none':
        return results[1];
      case 'slight':
        return results[2];
      case 'moderate':
        return results[3];
      case 'strong':
        return results[4];
      case 'extreme':
        return results[5];
    }
  }
}
