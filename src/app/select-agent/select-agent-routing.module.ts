import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectAgentPage } from './select-agent.page';

const routes: Routes = [
  {
    path: '',
    component: SelectAgentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectAgentPageRoutingModule {}
