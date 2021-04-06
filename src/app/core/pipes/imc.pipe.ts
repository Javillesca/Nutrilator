import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imc'
})
export class ImcPipe implements PipeTransform {

  transform(value: number): any {
    if (value < 16) {
      return 'Desnutrición severa';
    } else if (value > 16 && value < 16.9) {
      return 'Desnutrición moderada';
    } else if (value > 17 && value < 18.5) {
      return 'Desnutrición leve';
    } else if (value > 18.5 && value < 24.9) {
      return 'Normal';
    } else if (value > 25 && value < 26.9) {
      return 'Sobrepeso grado I';
    } else if (value > 27 && value < 29.9) {
      return 'Sobrepeso grado II';
    } else if (value > 30 && value < 34.9) {
      return 'Obesidad grado I';
    } else if (value > 35 && value < 39.9) {
      return 'Obesidad grado II';
    } else if (value > 40) {
      return 'Obesidad mórbida';
    } 
  }

}