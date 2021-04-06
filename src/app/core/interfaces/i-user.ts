export interface IUser {
    UID: string;
    name: string;
    email: string;
    phone?: string;
    presentation?: string;
}

export class CUser {
    UID = '';
    name = '';
    email = '';
    phone = '';
    presentation = '';
}
