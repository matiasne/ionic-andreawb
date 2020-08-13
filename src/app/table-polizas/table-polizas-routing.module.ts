import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablePolizasPage } from './table-polizas.page';

const routes: Routes = [
  {
    path: '',
    component: TablePolizasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePolizasPageRoutingModule {}
