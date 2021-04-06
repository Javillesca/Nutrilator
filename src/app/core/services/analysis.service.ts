import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor() { }

  getAge(value: Date): number {
    const date = new Date();
    const birthDate = new Date(value);
    let age = date.getFullYear() - birthDate.getFullYear();
    const month = date.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && date.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getIMC(height: number, weight: number): number {
    const IMC = weight / Math.pow(Number(height / 100), 2 );
    return Number(IMC.toFixed(1));
  }

  getIdealWeight(gender: string, age: number, height: number): number {
    let x;
    if (gender === 'M') {
      x = 0.25;
    } else {
      x = 0.4;
    }
    const form1 = ((height - 150 ) * 0.75) + 50;
    const form2 = (height - 100) - (height - 150) * 0.25 + (age - 20) * x;
    const result = (form1 + form2) / 2;
    return result;
  }

  getPercentOverweight(weight: number, ideal: number): number {
    const result = ((weight * 100) / ideal) - 100;
    return Number(result.toFixed(0));
  }

  getTmb(weight: number, height: number, age: number, gender: string, metabolism: string): number {
    let calc = (10 * weight ) + (6.25 * height ) - ( 5 * age );
    let result;
    if (gender === 'M') {
      calc = calc + 5;
    } else {
      calc = calc - 161;
    }
    switch (metabolism) {
      case 'none':
        result = calc * 1.2;
        return Number(result.toFixed(2));
      case 'slight':
        result = calc * 1.375;
        return Number(result.toFixed(2));
      case 'moderate':
        result = calc * 1.55;
        return Number(result.toFixed(2));
      case 'strong':
        result = calc * 1.725;
        return Number(result.toFixed(2));
      case 'extreme':
        result = calc * 1.9;
        return Number(result.toFixed(2));
    }
    return 0;
  }
}
