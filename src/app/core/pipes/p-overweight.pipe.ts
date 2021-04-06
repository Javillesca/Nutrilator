import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pOverweight'
})
export class POverweightPipe implements PipeTransform {

  transform(value: number, gender: string): any {
    if (gender === 'W') {
      if (value < 15) {
        return 'Grasa esencial';
      } else if (value > 15.1 && value < 20.9) {
        return 'Óptimo';
      } else if (value > 21 && value < 25.9) {
        return 'Ligero sobrepeso';
      } else if (value > 26 && value < 31.9) {
        return 'Sobrepeso';
      } else if (value >= 32) {
        return 'Obesidad';
      }
    }
    if (gender === 'M') {
      if (value < 8) {
        return 'Grasa esencial';
      } else if (value > 8.1 && value < 15.9) {
        return 'Óptimo';
      } else if (value > 14 && value < 17.9) {
        return 'Ligero sobrepeso';
      } else if (value > 18 && value < 24.9) {
        return 'Sobrepeso';
      } else if (value >= 25) {
        return 'Obesidad';
      }
    }
  }
}
