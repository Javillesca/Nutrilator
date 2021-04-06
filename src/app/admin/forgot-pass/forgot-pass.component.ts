import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UtilitiesService } from '../../core/services/utilities.service';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  user: UserModel;
  img: string = environment.img;
  constructor(
      private authSvc: AuthService,
      private utilsSvc: UtilitiesService
  ) {
    this.user = new UserModel();
  }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      await this.authSvc.resetPassword(form.value.email);
      const oTitle = 'Revise su email';
      const oTextBody = 'Le enviamos un email para restablecer su nueva contraseña.';
      this.utilsSvc.showConfirm(oTitle, oTextBody, 'login');

    }

  }

}
