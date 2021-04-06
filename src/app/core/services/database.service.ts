import { Injectable } from '@angular/core';
import 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

import { IClient } from '../interfaces/i-client';
import { IUser, CUser } from '../interfaces/i-user';
import { UtilitiesService } from './utilities.service';
import { CClient } from 'src/app/core/interfaces/i-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  clients: IClient[] = [];
  user: IUser = new CUser();

  constructor(
    private utilSvc: UtilitiesService,
    private authSvc: AuthService
  ) {}

  async createClient(client: IClient) {

    const db = firebase.firestore();
    const oUser = await this.authSvc.getCurrentUser();

    db.collection('clients').add({
      name: client.name,
      birthDate: client.birthDate,
      height: client.height,
      weight: client.weight,
      gender: client.gender,
      metabolism: client.metabolism,
      email: client.email,
      dietitian: oUser?.uid,
      phone: client.phone,
    })
    .then((success) => {
      this.utilSvc.onNavTo('result', success.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  }

  async getClients(): Promise<void> {
    const db = firebase.firestore();
    const oUser = await this.authSvc.getCurrentUser();
    this.clients = [];
    await db.collection('clients').where('dietitian', '==', oUser?.uid).get()
      .then(async (querySnapshot) => {
        await querySnapshot.forEach((doc) => {
          const oClient: any = doc.data();
          oClient.ID = doc.id;
          this.clients.push(oClient);
        });
      }
    );
  }

  async getClient(id: string): Promise<IClient> {
    if (this.clients.length <= 0) {
      await this.getClients();
    }
    let oClient = this.clients.find((item: IClient) => item.ID === id);
    if (oClient === undefined) {
      const db = firebase.firestore();
      await db.collection('clients').doc(id).get()
      .then(async (doc) => {
          oClient = await doc.data() as IClient;
      });
    }
    return oClient || new CClient();
  }

  async editClient(client: IClient): Promise<void> {
    const db = firebase.firestore();

    await db.collection('clients').doc(client.ID).update({
      name: client.name,
      birthDate: client.birthDate,
      height: client.height,
      weight: client.weight,
      gender: client.gender,
      metabolism: client.metabolism,
      email: client.email,
      phone: client.phone
    })
    .then(async (success) => {
      await this.getClients();
      this.utilSvc.onNavTo('result', client.ID);
    })
    .catch((error) => {
      console.error('Error update document: ', error);
    });
  }

  async deleteClient(client: IClient, context: any): Promise<void> {
    const db = firebase.firestore();
    await db.collection('clients').doc(client.ID).delete()
    .then(() => {
        context.showConfirm('', 'El cliente fue eliminado correctamente.', 'main');
    })
    .catch((error) => {
      console.error('Error delete document: ', error);
    });
  }

}
