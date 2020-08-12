import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRegistroPolizaPageRoutingModule } from './form-registro-poliza-routing.module';

import { FormRegistroPolizaPage } from './form-registro-poliza.page';
import { ComponentsModule } from '../Components/components.module';
import { PolizaService } from '../Services/poliza.service';
import { ToastService } from '../Services/toast.service';
import { UsuarioService } from '../Services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    FormRegistroPolizaPageRoutingModule
  ],
  declarations: [FormRegistroPolizaPage],
  providers: [PolizaService, ToastService, UsuarioService]
})
export class FormRegistroPolizaPageModule {}
