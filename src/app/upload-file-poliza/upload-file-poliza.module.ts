import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadFilePolizaPageRoutingModule } from './upload-file-poliza-routing.module';

import { UploadFilePolizaPage } from './upload-file-poliza.page';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxFileDropModule,
    IonicModule,
    UploadFilePolizaPageRoutingModule
  ],
  declarations: [UploadFilePolizaPage]
})
export class UploadFilePolizaPageModule {}
