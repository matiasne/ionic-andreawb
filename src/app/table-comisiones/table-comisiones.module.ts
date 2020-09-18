import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableComisionesPageRoutingModule } from './table-comisiones-routing.module';

import { TableComisionesPage } from './table-comisiones.page';
import { ComponentsModule } from '../Components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TableComisionesPageRoutingModule
  ],
  declarations: [TableComisionesPage]
})
export class TableComisionesPageModule {}
