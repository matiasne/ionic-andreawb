import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableClientesPage } from './table-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: TableClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableClientesPageRoutingModule {}
