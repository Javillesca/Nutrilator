import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import User from 'firebase';


import { UserModel } from '../../models/user.model';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  async login(user: UserModel): Promise<any> {
    try {
      const login = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
      console.log(login);
      return login;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  async register(user: UserModel): Promise<void> {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(async () => {
        const cUser = await this.afAuth.currentUser;
        if (cUser) {
          cUser.updateProfile({
            displayName: user.name
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async editUser(pName: string): Promise<boolean> {
    try {
      const cUser = await this.afAuth.currentUser;
      await cUser?.updateProfile({
        displayName: pName
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getCurrentUser(): Promise<User.User | null> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

}
