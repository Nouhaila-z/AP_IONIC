import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AjouterAlertePageRoutingModule } from './ajouter-alerte-routing.module';

import { AjouterAlertePage } from './ajouter-alerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterAlertePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AjouterAlertePage]
})
export class AjouterAlertePageModule {}
