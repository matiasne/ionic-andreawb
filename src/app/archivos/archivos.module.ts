import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivosPageRoutingModule } from './archivos-routing.module';

import { ArchivosPage } from './archivos.page';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
   
    NgxDatatableModule,
    IonicModule,
    ArchivosPageRoutingModule
  ],
  declarations: [ArchivosPage]
})
export class ArchivosPageModule {}
