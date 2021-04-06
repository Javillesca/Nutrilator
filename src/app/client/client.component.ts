import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CClient, IClient } from 'src/app/core/interfaces/i-client';
import { DatabaseService } from '../core/services/database.service';
import { UtilitiesService } from '../core/services/utilities.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  client: IClient = new CClient();

  clients: IClient[] = [];

  constructor(
    private db: DatabaseService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit(): void {
  }

  onSubmit(formTemplate: NgForm) {
    if ( formTemplate.invalid ) {
      Object.values(formTemplate.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.client = formTemplate.value;
    this.db.createClient(this.client);
  }

  onCancel(): void {
    this.utilities.onNavTo('main');
  }


}
