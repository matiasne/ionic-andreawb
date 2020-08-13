import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { AuthenticationFirebaseService } from '../Services/authentication/authentication-firebase.service';
import { UsuarioService } from '../Services/usuario.service';
import { ParametrosService } from '../Services/global/parametros.service';


@Component({
  selector: 'app-form-registro-cliente',
  templateUrl: './form-registro-cliente.page.html',
  styleUrls: ['./form-registro-cliente.page.scss'],
})
export class FormRegistroClientePage implements OnInit {
  tipoRegistro: string = 'cliente';
  cliente: Client;
  datosForm: FormGroup;
  submitted = false;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private toastService:ToastService,
    private usuarioService:UsuarioService,
    private clientesService:ClientesService,
    private parametrosService:ParametrosService,
    private modalController:ModalController
  ) { 
    this.datosForm = this.formBuilder.group({
      id:['',null],
      agentId:['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      altphone:['',null],
      email: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.cliente = new Client();

    if(this.parametrosService.param instanceof Client){
      this.isEditing = true;
      console.log(this.parametrosService.param)
      this.cliente = this.parametrosService.param;
      this.datosForm.patchValue(this.parametrosService.param)
    }
  }

  ngOnInit() {
  }

  get f() { return this.datosForm.controls; }

  registrar(){

    this.submitted = true;     

    this.datosForm.patchValue({
      agentId: this.usuarioService.getUID()
    });

    if(this.datosForm.invalid){
      this.toastService.mensaje("","Por favor completar todos los campos solicitados")
      return
    }  

    this.cliente.asignarValores(this.datosForm.value);
    console.log(this.cliente);

    if(this.isEditing){
      this.clienteService.update(this.cliente).then(data =>{
        console.log(data);
      })
    }
    else{
      this.clienteService.add(this.cliente).then(data =>{
        console.log(data);
      })
    }   

    this.parametrosService.param = "";
    this.modalController.dismiss();
    
  }

  setValue(newValue: any){
    this.datosForm.patchValue({
      address:newValue.address
    })
  }

}
