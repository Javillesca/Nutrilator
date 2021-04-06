import { Component, OnInit } from '@angular/core';
import { IClient } from '../core/interfaces/i-client';
import { UtilitiesService } from '../core/services/utilities.service';
import { DatabaseService } from '../core/services/database.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listClients: IClient[] = [];
  filterName: any;
  filterContact: any;

  constructor(
    private dbSvc: DatabaseService,
    private utilsSvc: UtilitiesService
  ) {
  }

  async ngOnInit() {
    await this.dbSvc.getClients();
    this.listClients = this.dbSvc.clients;
  }

  onAddClient(): void {
    this.utilsSvc.onNavTo('client');
  }

  onShowClient(client: IClient): void {
    this.utilsSvc.onNavTo('result', client.ID);
  }

  async onSearch(formTemplate: NgForm) {
    if (formTemplate.value.name && formTemplate.value.phone) {
      this.listClients = this.listClients.filter(client =>
        client.name.toLocaleLowerCase().includes(formTemplate.value.name.toLocaleLowerCase()) ||
        client.phone?.toLocaleLowerCase().includes(formTemplate.value.phone.toLocaleLowerCase())
      );
    } else if (formTemplate.value.name){
      this.listClients = this.listClients.filter(client =>
        client.name.toLocaleLowerCase().includes(formTemplate.value.name.toLocaleLowerCase())
      );
    } else if (formTemplate.value.phone) {
      this.listClients = this.listClients.filter(client =>
        client.phone?.toLocaleLowerCase().includes(formTemplate.value.phone.toLocaleLowerCase())
      );
    } else {
      this.listClients = this.dbSvc.clients;
    }
  }

}
