import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierAlertePage } from './modifier-alerte.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierAlertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierAlertePageRoutingModule {}
