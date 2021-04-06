import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { NgForm } from '@angular/forms';
import { UtilitiesService } from '../../core/services/utilities.service';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  rememberUser: boolean;
  img: string = environment.img;

  constructor(
    private authSvc: AuthService,
    private utilSvc: UtilitiesService
  ) {
    this.user = new UserModel();
    this.rememberUser = false;
   }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.user.password = localStorage.getItem('password');
      this.rememberUser = true;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.utilSvc.showAlert(false, 'info', 'Cargando', 'Iniciando sesión..');
      this.authSvc.login(this.user)
        .then(() => {
          if (this.rememberUser) {
            localStorage.setItem('email', this.user.email);
            localStorage.setItem('password', this.user.password);
          } else {
            if (localStorage.getItem('email')) {
              localStorage.removeItem('email');
              localStorage.removeItem('password');
            }
          }
          this.utilSvc.closeAlert();
          this.utilSvc.onNavTo('main');
        }, (errorData: any) => {
          this.utilSvc.showAlert(true, 'error', 'Error al iniciar', this.utilSvc.getError(errorData.error.error.message));
      });
    }
  }

}
