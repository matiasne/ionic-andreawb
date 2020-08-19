import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRegistroCompaniasPage } from './form-registro-companias.page';

const routes: Routes = [
  {
    path: '',
    component: FormRegistroCompaniasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRegistroCompaniasPageRoutingModule {}
