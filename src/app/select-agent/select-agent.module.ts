import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectAgentPageRoutingModule } from './select-agent-routing.module';

import { SelectAgentPage } from './select-agent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectAgentPageRoutingModule
  ],
  declarations: [SelectAgentPage]
})
export class SelectAgentPageModule {}
