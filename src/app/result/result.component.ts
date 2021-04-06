import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClient } from '../core/interfaces/i-client';
import { AnalysisService } from '../core/services/analysis.service';
import { UtilitiesService } from '../core/services/utilities.service';
import { DatabaseService } from '../core/services/database.service';
import { IAnalysis, CAnalysis } from '../core/interfaces/i-analysis';
import { CClient } from 'src/app/core/interfaces/i-client';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  client: IClient = new CClient();

  analysis: IAnalysis = new CAnalysis();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dbSvc: DatabaseService,
    private utilsSvc: UtilitiesService,
    private anlsSvc: AnalysisService
  ) {
    this.activatedRoute.params.subscribe(async params => {
      const oID = params['id'];
      const oClient = await this.dbSvc.getClient(oID);
      this.client = oClient;
      this.client.ID = oID;
      this.client.age = this.anlsSvc.getAge(
        this.client.birthDate
      );
      this.analysis.IMC = this.anlsSvc.getIMC(
        Number(this.client.height),
        Number(this.client.weight)
      );
      this.analysis.ideal = this.anlsSvc.getIdealWeight(
        this.client.gender,
        Number(this.client.age),
        Number(this.client.height)
      );
      this.analysis.percentOverweight = this.anlsSvc.getPercentOverweight(
        Number(this.client.weight),
        Number(this.analysis.ideal)
      );
      this.analysis.TMB = this.anlsSvc.getTmb(
        Number(this.client.weight),
        Number(this.client.height),
        Number(this.client.age),
        this.client.gender,
        this.client.metabolism
      );
      console.log(this.analysis);
    });
  }

  ngOnInit(): void {
  }

  onEditClient(): void {
    this.utilsSvc.onNavTo('edit', this.client.ID);
  }

  onBack(): void {
    this.utilsSvc.onNavTo('main');
  }

  onDelete(): void {
    const bodyAlert = `Si continuas eliminarás por completo al cliente ${this.client.name} \n ¿Esta seguro?`;
    const oAction = this.dbSvc.deleteClient;
    this.utilsSvc.showDelete('Eliminar cliente', bodyAlert, oAction, this.client);
  }
}
