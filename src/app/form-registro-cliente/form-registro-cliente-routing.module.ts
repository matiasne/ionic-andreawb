import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRegistroClientePage } from './form-registro-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: FormRegistroClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRegistroClientePageRoutingModule {}
