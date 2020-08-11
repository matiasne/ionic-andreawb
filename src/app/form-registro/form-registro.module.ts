import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRegistroPageRoutingModule } from './form-registro-routing.module';

import { FormRegistroPage } from './form-registro.page';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    FormRegistroPageRoutingModule,
  ],
  declarations: [FormRegistroPage]
})
export class FormRegistroPageModule {}
