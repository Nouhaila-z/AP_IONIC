import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: 'alertes',
    loadChildren: () => import('./alertes/alertes.module').then( m => m.AlertesPageModule)
  },  {
    path: 'ajouter-alerte',
    loadChildren: () => import('./ajouter-alerte/ajouter-alerte.module').then( m => m.AjouterAlertePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
