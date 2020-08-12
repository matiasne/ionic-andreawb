import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRegistroClientePageRoutingModule } from './form-registro-cliente-routing.module';

import { FormRegistroClientePage } from './form-registro-cliente.page';
import { ComponentsModule } from '../Components/components.module';
import { ClientesService } from '../Services/cliente.service';
import { ToastService } from '../Services/toast.service';
import { UsuarioService } from '../Services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    FormRegistroClientePageRoutingModule
  ],
  declarations: [FormRegistroClientePage],
  providers: [ClientesService, ToastService, UsuarioService]
})
export class FormRegistroClientePageModule {}
