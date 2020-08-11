import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRegistroPage } from './form-registro.page';

const routes: Routes = [
  {
    path: '', 
    component: FormRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRegistroPageRoutingModule {}
