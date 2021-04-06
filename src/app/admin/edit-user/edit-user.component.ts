import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UtilitiesService } from '../../core/services/utilities.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: any;
  constructor(
    private authSvc: AuthService,
    private utilsSvc: UtilitiesService
  ) {}

  async ngOnInit() {
    this.user = await this.authSvc.getCurrentUser();
  }

  onCancel() {
    this.utilsSvc.onNavTo('profile');
  }

  async onSubmit(formTemplate: NgForm) {
    if ( formTemplate.invalid ) {
      Object.values(formTemplate.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    const oEdited = await this.authSvc.editUser(formTemplate.value.name);
    if (oEdited) {
      this.utilsSvc.onNavTo('profile');
    } else {
      this.utilsSvc.showError('Error', 'Ocurrió un error al guardarse los cambios, intentelo de nuevo.');
    }
  }

}
