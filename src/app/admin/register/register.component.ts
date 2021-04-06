import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { UtilitiesService } from '../../core/services/utilities.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  img: string = environment.img;

  constructor(
    private authSvc: AuthService,
    private utilsSvc: UtilitiesService
  ) {
    this.user = new UserModel();
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.utilsSvc.showAlert(false, 'info', 'Generando', 'Gestionando la creación de su cuenta');
      console.log(this.user);
      this.authSvc.register(this.user).then(() => {
        this.utilsSvc.closeAlert();
        this.utilsSvc.onNavTo('login');
      }, (errorData: any) => {
        this.utilsSvc.showAlert(true, 'error', 'Error en creación', this.utilsSvc.getError(errorData.error.error.message));
        console.log(errorData);
      });
    }
  }
}
