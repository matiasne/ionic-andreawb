import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableAgentesPage } from './table-agentes.page';

const routes: Routes = [
  {
    path: '',
    component: TableAgentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableAgentesPageRoutingModule {}
