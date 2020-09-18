import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadComisionPageRoutingModule } from './upload-comision-routing.module';

import { UploadComisionPage } from './upload-comision.page';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxFileDropModule,
    IonicModule,
    UploadComisionPageRoutingModule
  ],
  declarations: [UploadComisionPage]
})
export class UploadComisionPageModule {}
