import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRegistroPolizaPage } from './form-registro-poliza.page';

const routes: Routes = [
  {
    path: '',
    component: FormRegistroPolizaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRegistroPolizaPageRoutingModule {}
