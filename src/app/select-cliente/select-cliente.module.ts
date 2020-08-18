import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectClientePageRoutingModule } from './select-cliente-routing.module';

import { SelectClientePage } from './select-cliente.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    NgxDatatableModule,
    IonicModule,
    SelectClientePageRoutingModule
  ],
  declarations: [SelectClientePage]
})
export class SelectClientePageModule {}
