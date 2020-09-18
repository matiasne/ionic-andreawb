import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectAgentPageRoutingModule } from './select-agent-routing.module';

import { SelectAgentPage } from './select-agent.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    IonicModule,
    SelectAgentPageRoutingModule
  ],
  declarations: [SelectAgentPage]
})
export class SelectAgentPageModule {}
