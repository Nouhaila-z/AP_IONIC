import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterAlertePage } from './ajouter-alerte.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterAlertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterAlertePageRoutingModule {}
