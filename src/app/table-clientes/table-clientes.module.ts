import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableClientesPageRoutingModule } from './table-clientes-routing.module';

import { TableClientesPage } from './table-clientes.page';
import { ComponentsModule } from '../Components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    TableClientesPageRoutingModule
  ],
  declarations: [TableClientesPage]
})
export class TableClientesPageModule {}
