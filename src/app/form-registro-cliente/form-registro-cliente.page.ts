import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { AuthenticationFirebaseService } from '../Services/authentication/authentication-firebase.service';
import { UsuarioService } from '../Services/usuario.service';
import { ParametrosService } from '../Services/global/parametros.service';
import { Usuario } from '../models/usuario';



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
  readonly = true;
  titulo ="New Client";
  usuario:Usuario;

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
      agentId:['',null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      altphone:['',null],
      email: ['', Validators.required]
    });
    this.cliente = new Client();
    
    

    if(this.parametrosService.param.cliente instanceof Client){
      this.isEditing = true;      
      console.log(this.parametrosService.param)
      this.cliente = this.parametrosService.param.cliente;
      this.datosForm.patchValue(this.parametrosService.param.cliente);
      this.titulo = "Edit Client";
    }

    
    
    
    if(this.usuarioService.isAdmin()){
      this.readonly = false;
    }
    if(this.usuarioService.isAgent()){
      let id = this.usuarioService.getUID();
      if(id == this.cliente.agentId){
        this.readonly = false;
      }
    }
    
    

    if(this.readonly){
      this.titulo = this.cliente.firstName+" "+this.cliente.lastName;
    }

    console.log(this.readonly)

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

    const item = JSON.parse(JSON.stringify(this.cliente)); 

    if(this.isEditing){
      this.clienteService.update(item).then(data =>{
        console.log(data);
      })
    }
    else{
      this.clienteService.add(item).then(data =>{
        console.log(data);
        this.modalController.dismiss(data);
      })
    }   

    this.modalController.dismiss();
    this.parametrosService.param = "";
    
    
  }

  setValue(newValue: any){
    this.datosForm.patchValue({
      address:newValue.address
    })
  }

  clickIcono($event){
    this.modalController.dismiss();
  }

}
