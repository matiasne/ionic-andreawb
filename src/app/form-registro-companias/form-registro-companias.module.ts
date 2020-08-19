import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRegistroCompaniasPageRoutingModule } from './form-registro-companias-routing.module';

import { FormRegistroCompaniasPage } from './form-registro-companias.page';
import { ComponentsModule } from '../Components/components.module';
import { ToastService } from '../Services/toast.service';
import { UsuarioService } from '../Services/usuario.service';
import { CompaniaService } from '../Services/compania.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    FormRegistroCompaniasPageRoutingModule
  ],
  declarations: [FormRegistroCompaniasPage],
  providers: [CompaniaService, ToastService, UsuarioService]
})
export class FormRegistroCompaniasPageModule {}
