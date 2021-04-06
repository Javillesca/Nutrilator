import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UtilitiesService } from '../../core/services/utilities.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  user: any;

  constructor(
    private authSvc: AuthService,
    private utilSvc: UtilitiesService
    ) {
    }

  async ngOnInit() {
    this.user = await this.authSvc.getCurrentUser();
    console.log(this.user);
  }

  onEditUser(): void {
    this.utilSvc.onNavTo('editProfile', this.user);
  }

  onBack(): void {
    this.utilSvc.onNavTo('main');
  }

}
