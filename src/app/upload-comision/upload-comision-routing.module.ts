import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadComisionPage } from './upload-comision.page';

const routes: Routes = [
  {
    path: '',
    component: UploadComisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadComisionPageRoutingModule {}
