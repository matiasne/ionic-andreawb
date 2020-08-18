import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableAgentesPageRoutingModule } from './table-agentes-routing.module';

import { TableAgentesPage } from './table-agentes.page';
import { ComponentsModule } from '../Components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    TableAgentesPageRoutingModule
  ],
  declarations: [TableAgentesPage]
})
export class TableAgentesPageModule {}
