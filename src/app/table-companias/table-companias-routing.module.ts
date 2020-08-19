import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableCompaniasPage } from './table-companias.page';

const routes: Routes = [
  {
    path: '',
    component: TableCompaniasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableCompaniasPageRoutingModule {}
