import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private router: Router
  ) { }

  onNavTo(url: string, id: string = '') {
    if (id){
      this.router.navigate([`/${url}`, id]);
    } else {
      this.router.navigate([`/${url}`]);
    }
  }

  getError(key: string): any {
    switch (key) {
      case 'EMAIL_NOT_FOUND':
        return 'Los datos de acceso no son correctos.';
      case 'INVALID_PASSWORD':
        return 'Los datos de acceso no son correctos.';
      case 'EMAIL_EXISTS':
        return 'Ya existe un usuario con este email asignado.';
    }
  }
  showAlert(loading: boolean, pIcon: any, pTitle: string, pText: string): any {
    Swal.fire({
      allowOutsideClick: loading,
      icon: pIcon,
      title: pTitle,
      text: pText
    });
    if (!loading) {
      Swal.showLoading();
    }
  }

  showDelete(pTitle: string, pText: string, pAction: any, data: any) {
     Swal.fire({
      icon: 'warning',
      title: pTitle,
      text: pText,
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then(async (result) => {
       if (result.isConfirmed) {
        pAction(data, this);
      }
    });
  }

  showConfirm(pTitle: string, pText: string, url: string) {
    Swal.fire({
      icon: 'success',
      allowOutsideClick: true,
      title: pTitle,
      text: pText,
    }).then((result) => {
      if (result.isConfirmed) {
        this.onNavTo(url);
      }
    });
  }

  showError(pTitle: string, pText: string) {
    Swal.fire({
      icon: 'error',
      allowOutsideClick: true,
      title: pTitle,
      text: pText
    }).then(() => {});
  }

  closeAlert(): any {
    Swal.close();
  }
}
