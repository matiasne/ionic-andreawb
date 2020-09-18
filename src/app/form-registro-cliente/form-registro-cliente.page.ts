import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { AuthenticationFirebaseService } from '../Services/authentication/authentication-firebase.service';
import { UsuarioService } from '../Services/usuario.service';
import { ParametrosService } from '../Services/global/parametros.service';
import { Usuario } from '../models/usuario';
import { SelectClientePage } from '../select-cliente/select-cliente.page';



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

  familyMembers:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private toastService:ToastService,
    private usuarioService:UsuarioService,
    private clientesService:ClientesService,
    private parametrosService:ParametrosService,
    private modalController:ModalController,
    private alertController:AlertController,
  ) { 
    this.datosForm = this.formBuilder.group({
      id:['',null],
      agentId:['',null],
      firstName: ['',null],
      lastName: ['',null],
      gender: ['',null],
      marital_status:['',null],
      us_citizen:['',null],
      type_document:['',null],
      an:['',null],
      card_number:['',null],
      expiration:['',null],
      category:['',null],
      visa_description:['',null],
      place_work:['',null],
      income:['',null],
      work_description:['',null],
      dateOfBirth: ['',null],
      address: ['',null],
      phone: ['',null],
      altphone:['',null],
      email: ['',null]
    });
    this.cliente = new Client();
    
    
    console.log(this.parametrosService.param)
    if(this.parametrosService.param.cliente instanceof Client){
      this.isEditing = true;      
     
      this.cliente = this.parametrosService.param.cliente;
      this.datosForm.patchValue(this.parametrosService.param.cliente);
      this.titulo = this.cliente.firstName+" "+this.cliente.lastName;

      if(this.cliente.familyMembersRef.length > 0){
        this.cliente.familyMembersRef.forEach(member =>{
          member.get().then(snap =>{
            let miembro = snap.data();
            miembro.id = snap.id;
            this.familyMembers.push(miembro);
          }) 
        })
      }
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

    this.cliente.asignarValores(this.datosForm.value);
    console.log(this.cliente);

    this.cliente.familyMembersRef = [];
    const item = JSON.parse(JSON.stringify(this.cliente)); 

    this.familyMembers.forEach(member =>{
      console.log(member)
      item.familyMembersRef.push(this.clienteService.getRef(member.id));
    });

   

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

  async addFamily(){
    const modal = await this.modalController.create({
      component: SelectClientePage
    });
    modal.onDidDismiss()
    .then((retorno:any) => {
      console.log(retorno.data);

      if(retorno.data != "crear"){
        this.insertFamily(retorno.data);
      }  
      if(retorno.data == "crear"){
        this.createFamily();
      } 
    })
    modal.present();
  }


  insertFamily(mem){
    let encontrado = false;

    this.familyMembers.forEach(member =>{
      if(member.id == mem.id){
        encontrado = true;
      }
    });
    if(!encontrado){
      this.familyMembers.push(mem);       
    }
    else{
      this.toastService.mensaje("","Miembro ya se encuentra agregado");
    }
  }

  async createFamily(){
    let modal = await this.modalController.create({
      component: FormRegistroClientePage
    }); 
    modal.onDidDismiss()
    .then((retorno:any) => {
      if(retorno.data){
        this.insertFamily(retorno.data);       
      }
    })
    modal.present();
  }

  async deleteFamily(index,miembro) {
    
    const alert = await this.alertController.create({
      header: 'Esta seguro?',
      message: 'Remover miembro: '+miembro.firstName+' '+miembro.lastName+' ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => { 
            this.cliente.familyMembersRef.splice(index,1);
            this.familyMembers.splice(index,1);
          }
        }
      ]
    });

    await alert.present();
  }

  async elimiar(){
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Está seguro que desea eliminar el cliente?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.clienteService.delete(this.cliente.id);
            this.modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
    
  }

}
