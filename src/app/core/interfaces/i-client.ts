export interface IClient {
    ID: string;
    name: string;
    birthDate: Date;
    age?: number;
    email?: string;
    dietitian: string;
    phone?: string;
    gender: string;
    height: string;
    weight: string;
    metabolism: string;
}

export class CClient {
    ID = '';
    name = '';
    birthDate = new Date();
    age: any;
    email = '';
    dietitian = '';
    phone = '';
    gender = '';
    height = '';
    weight = '';
    metabolism = '';
}
