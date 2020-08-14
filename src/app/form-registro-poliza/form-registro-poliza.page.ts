import { Component, OnInit, Input } from '@angular/core';
import { Policy } from '../models/policy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { PolizaService } from '../Services/poliza.service';
import { ToastService } from '../Services/toast.service';
import { ParametrosService } from '../Services/global/parametros.service';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../Services/usuario.service';
import { SelectClientePage } from '../select-cliente/select-cliente.page';
import { AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { FormRegistroClientePage } from '../form-registro-cliente/form-registro-cliente.page';

@Component({
  selector: 'app-form-registro-poliza',
  templateUrl: './form-registro-poliza.page.html',
  styleUrls: ['./form-registro-poliza.page.scss'],
})
export class FormRegistroPolizaPage implements OnInit {

  @Input() dismissFirstModal;
  
  poliza: Policy;
  datosForm: FormGroup;
  submitted = false;
  familyMembers:any[] = [];
  client:Client;
  
  isEditing = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private polizaService: PolizaService,
    private toastService:ToastService,
    private parametrosService:ParametrosService,
    private modalController:ModalController,
    private usuarioService:UsuarioService
  ) { 
    this.datosForm = this.formBuilder.group({
      id: [''],
      agentId: [''], 
      clientRef:['',Validators.required],
      number: ['', Validators.required],
      receivedDate: [new Date, Validators.required],
      effectiveDate: [new Date, Validators.required],
      policyTermDate: [new Date, Validators.required],
      paidThroughDate: [new Date, Validators.required],
      state: ['', Validators.required],
      responsability: ['', Validators.required],
      autoplay: ['', Validators.required],
      elegibleForCommission: [''],
    });
    this.poliza = new Policy();
    this.client = new Client();

    if(this.parametrosService.param instanceof Policy){
      this.isEditing = true;
      console.log(this.parametrosService.param)
      this.poliza = this.parametrosService.param;
      this.datosForm.patchValue(this.parametrosService.param);
      
      if(this.poliza.clientRef){
        this.poliza.clientRef.get().then(snap =>{
          this.client.asignarValores(snap.data());
          this.client.id = snap.id;
          console.log(this.client)
        }) 
      }

      if(this.poliza.familyMembersRef.length > 0){
        this.poliza.familyMembersRef.forEach(member =>{
          member.get().then(snap =>{
            let miembro = snap.data();
            miembro.id = snap.id;
            this.familyMembers.push(miembro);
          }) 
        })
      }
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

    console.log(this.datosForm.value)

    if(this.datosForm.invalid){
      this.toastService.mensaje("","Por favor completar todos los campos solicitados")
      return
    }  

    this.poliza.asignarValores(this.datosForm.value);
    console.log(this.poliza);
    this.poliza.clientRef =""; //Para que al convertirlo a json.stringify no tire error de Cirular 
    this.poliza.familyMembersRef = [];

    const item = JSON.parse(JSON.stringify(this.poliza)); 
    
    if(this.client.id != "")
     item.clientRef = this.clienteService.getRef(this.client.id); //se hace despues porque el documentReference da mal en JSON.stringify
   
    if(this.familyMembers.length > 0){
      this.familyMembers.forEach(member =>{
        console.log(member)
        item.familyMembersRef.push(this.clienteService.getRef(member.id));
      });
    }
    

    console.log(item);

    if(this.isEditing){
      this.polizaService.update(item).then(data =>{
        console.log(data);
      })
    }
    else{      
      this.polizaService.add(item).then(data =>{
        console.log(data);
      })
    }   

    this.parametrosService.param = "";
    this.modalController.dismiss();    
  }

  async addClient(){
    const modal = await this.modalController.create({
      component: SelectClientePage
    });
    modal.onDidDismiss()
    .then((retorno:any) => {
      console.log(retorno.data);

      if(retorno.data != "crear"){
        this.client = retorno.data;
        this.datosForm.patchValue({
          clientRef: "true"
        })
      }  
      if(retorno.data == "crear"){
        this.createClient();
      } 
    })
    modal.present();
  }

  async createClient(){
    let modal = await this.modalController.create({
      component: FormRegistroClientePage
    }); 
    modal.onDidDismiss()
    .then((retorno:any) => {
      if(retorno.data){
        this.client = retorno.data;
        this.datosForm.patchValue({
          clientRef: "true"
        })
       
      }
    })
    modal.present();
  }

  deleteClient(){
    this.client = new Client();
  }

  deleteFamily(index){
    this.familyMembers.splice(index,1);
  }


  async addFamily(){
    const modal = await this.modalController.create({
      component: SelectClientePage
    });
    modal.onDidDismiss()
    .then((retorno:any) => {
      console.log(retorno.data);

      if(retorno.data != "crear"){
        this.familyMembers.push(retorno.data);
      }  
      if(retorno.data == "crear"){
        this.createFamily();
      } 
    })
    modal.present();
  }

  async createFamily(){
    let modal = await this.modalController.create({
      component: FormRegistroClientePage
    }); 
    modal.onDidDismiss()
    .then((retorno:any) => {
      if(retorno.data){
        this.familyMembers.push(retorno.data);       
      }
    })
    modal.present();
  }



  clickIcono($event){
    this.modalController.dismiss();
  }

}
