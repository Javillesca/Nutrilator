import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IClient } from '../core/interfaces/i-client';
import { DatabaseService } from '../core/services/database.service';
import { UtilitiesService } from '../core/services/utilities.service';
import { CClient } from 'src/app/core/interfaces/i-client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  client: IClient = new CClient();
  idClient = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private _db: DatabaseService,
    private _utilities: UtilitiesService
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.idClient = params['id'];
      this.client = await this._db.getClient(this.idClient);
      console.log(this.client);
    });
   }

  ngOnInit(): void {
  }

  onSubmit(formTemplate: NgForm): any {
    if ( formTemplate.invalid ) {
      Object.values(formTemplate.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.client = formTemplate.value;
    this.client.ID = this.idClient;
    this._db.editClient(this.client);
  }

  onCancel(): any {
    this._utilities.onNavTo('result', this.idClient);
  }

}
