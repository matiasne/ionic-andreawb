import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePolizasPageRoutingModule } from './table-polizas-routing.module';

import { TablePolizasPage } from './table-polizas.page';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    TablePolizasPageRoutingModule
  ],
  declarations: [TablePolizasPage]
})
export class TablePolizasPageModule {}
