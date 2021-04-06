import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../core/services/utilities.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private utilsSvc: UtilitiesService,
    private authSvc: AuthService
  ) { }

  onBack(): void {
    this.utilsSvc.onNavTo('main');
  }

  onLogout(): void {
    this.authSvc.logout().then(() => {
      this.utilsSvc.onNavTo('login');
    });
  }

  onProfile(): void {
    this.utilsSvc.onNavTo('profile');
  }

}
