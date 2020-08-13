import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComisionesPage } from './table-comisiones.page';

const routes: Routes = [
  {
    path: '',
    component: TableComisionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableComisionesPageRoutingModule {}
