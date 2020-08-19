import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableCompaniasPageRoutingModule } from './table-companias-routing.module';

import { TableCompaniasPage } from './table-companias.page';
import { ComponentsModule } from '../Components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    TableCompaniasPageRoutingModule
  ],
  declarations: [TableCompaniasPage]
})
export class TableCompaniasPageModule {}
