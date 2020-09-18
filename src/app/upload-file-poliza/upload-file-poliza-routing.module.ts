import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadFilePolizaPage } from './upload-file-poliza.page';

const routes: Routes = [
  {
    path: '',
    component: UploadFilePolizaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadFilePolizaPageRoutingModule {}
