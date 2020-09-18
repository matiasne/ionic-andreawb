import { Component, OnInit, Input } from '@angular/core';
import { Policy } from '../models/policy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { PolizaService } from '../Services/poliza.service';
import { ToastService } from '../Services/toast.service';
import { ParametrosService } from '../Services/global/parametros.service';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../Services/usuario.service';
import { SelectClientePage } from '../select-cliente/select-cliente.page';
import { AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { FormRegistroClientePage } from '../form-registro-cliente/form-registro-cliente.page';
import { LoadingService } from '../Services/loading.service';
import { ArchivosPageModule } from '../archivos/archivos.module';
import { ComentariosPageModule } from '../comentarios/comentarios.module';
import { ArchivosPage } from '../archivos/archivos.page';
import { ComentariosPage } from '../comentarios/comentarios.page';
import { CompaniaService } from '../Services/compania.service';
import { Usuario } from '../models/usuario';
import { SelectAgentPage } from '../select-agent/select-agent.page';
import { AgentesService } from '../Services/agentes.service';


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
  companias = [];
  planes =[];
  client:Client;
  agent:Usuario;
  readonly = true;
  isEditing = false;
  titulo = "New Policy";
  isSaved = true;
  agentRef:DocumentReference;
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private agentesService:AgentesService,
    private polizaService: PolizaService,
    private toastService:ToastService,
    private parametrosService:ParametrosService,
    private modalController:ModalController,
    private usuarioService:UsuarioService,
    private navCtrl:NavController,
    private loadingService:LoadingService,
    private alertController:AlertController,
    private companiaService:CompaniaService
  ) { 
    this.datosForm = this.formBuilder.group({
      id: [''],
      status:[''],
      agentRef: [''], 
      clientRef:['',Validators.required],
      number: ['', Validators.required],
      company: ['', Validators.required],
      plan: ['', Validators.required],
      receivedDate: [new Date, Validators.required],
      effectiveDate: [new Date, Validators.required],
      policyTermDate: [new Date, Validators.required],
      paidThroughDate: [new Date, Validators.required],
      state: ['FL', Validators.required],
      montlyPremium:['',Validators.required],
      responsability: ['', Validators.required],
      aplication_id:['',null],
      autoplay: ['', Validators.required],
      elegibleForCommission: [''],
      document_needed:[''],
      need_us_passport:['false',null],
      need_green_card:['false',null],
      need_employemnt_auth:['false',null],
      need_paystub:['false',null]
    });

    

    this.poliza = new Policy();
    this.client = new Client();
    this.agent = new Usuario();

    this.companiaService.list().subscribe(snapshot=>{
      this.companias = snapshot;
    })

    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){

    
    if(this.parametrosService.param.poliza instanceof Policy){
      this.isEditing = true;
      this.poliza = this.parametrosService.param.poliza;
      this.datosForm.patchValue(this.parametrosService.param.poliza);
      
      if(this.poliza.clientRef){
        this.loadingService.presentLoading();
        this.poliza.clientRef.get().then(snap =>{
          this.loadingService.dismissLoading();
          this.client.asignarValores(snap.data());
          this.client.id = snap.id;

          if(this.client.familyMembersRef.length > 0){
            this.client.familyMembersRef.forEach(member =>{
              member.get().then(snap =>{
                let miembro = snap.data();
                miembro.id = snap.id;
                

                this.poliza.coveredRelatives.forEach(coveredId =>{
                  if(member.id == coveredId){
                    miembro.covered = true;
                  }
                })

                this.familyMembers.push(miembro);
                console.log(this.familyMembers);
              }) 
            })
          }

          

          

        }) 
      }    

      if(this.poliza.agentRef){
        this.poliza.agentRef.get().then(snap =>{
          this.agent.asignarValores(snap.data());
          this.agent.id = snap.id;
        });
        this.agentRef = this.poliza.agentRef; 
      }  
      console.log(this.poliza);     
    }//Si es una poliza nueva
    else{
      this.agentRef = this.usuarioService.getActualRef();
    }

  
    if(this.usuarioService.isAdmin()){
      this.readonly = false;
    }
    if(this.usuarioService.isAgent()){
      let id = this.usuarioService.getUID();
      if(id == this.poliza.agentId){
        this.readonly = false;
      }
    }

    

    if(this.isEditing){
      this.titulo = "Edit Policy";
    }

    if(this.readonly){
      this.titulo = "Policy "+this.poliza.number;
    }

    this.datosForm.valueChanges.subscribe(data=>{
      this.isSaved = false;
    })
  }

  changeCompany(event){
    this.companias.forEach(com =>{
      if(com.name == event.target.value){
        this.planes = com.plans;
      }
    })
    
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

    this.poliza.asignarValores(this.datosForm.value);
    this.poliza.clientRef =""; //Para que al convertirlo a json.stringify no tire error de Cirular 
    this.poliza.agentRef =""; //Para que al convertirlo a json.stringify no tire error de Cirular 
    

    const item = JSON.parse(JSON.stringify(this.poliza)); 
    
    if(this.client.id != ""){
     item.clientRef = this.clienteService.getRef(this.client.id); //se hace despues porque el documentReference da mal en JSON.stringify
     item.clientName = this.client.firstName+' '+this.client.lastName;
    }
    
   
    
    
    item.agentRef = this.agentRef;  
    item.agentName = this.usuarioService.getNombre();
    item.agentId = this.usuarioService.getUID();

    this.loadingService.presentLoading();
    this.isSaved = true;
    if(this.isEditing){
      this.loadingService.dismissLoading();
      this.polizaService.update(item).then(data =>{        
        this.toastService.mensaje("","Policy updated");
      })
    }
    else{      
      this.polizaService.add(item).then(data =>{
        this.loadingService.dismissLoading();
        this.isEditing = true; 
        this.poliza.asignarValores(data);
        this.datosForm.patchValue(data);
        this.toastService.mensaje("","New Policy created");
      })
    }   

    this.parametrosService.param = "";
  }

  async verCliente(miembro){
    let cliente = new Client();
    cliente.asignarValores(miembro);
    this.parametrosService.param.cliente = cliente;
    const modal = await this.modalController.create({
      component: FormRegistroClientePage
    });    
    modal.present();
  }

  async addClient(){
    const modal = await this.modalController.create({
      component: SelectClientePage
    });
    modal.onDidDismiss()
    .then((retorno:any) => {

      if(retorno.data != "crear"){
        this.insertClient(retorno.data);
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

  async changeAgent(){
    const modal = await this.modalController.create({
      component: SelectAgentPage
    });
    modal.onDidDismiss()
    .then((retorno:any) => {

      this.agentRef = this.agentesService.getRef(retorno.data.id);
      this.agent = retorno.data;
      console.log(this.agent)
      this.datosForm.patchValue({
        agentRef: "true"
      })
      
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
        this.insertClient(retorno.data);
        this.datosForm.patchValue({
          clientRef: "true"
        })
       
      }
    })
    modal.present();
  } 

  insertClient(cli){
    let encontrado = false;

    if(this.client.id == cli.id){
      encontrado = true;
      this.toastService.mensaje("","Ya se encuentra agregado");
      return;
    }

    this.client = cli;
    
    if(this.client.familyMembersRef.length > 0){
      this.client.familyMembersRef.forEach(member =>{
        member.get().then(snap =>{
          let miembro = snap.data();
          miembro.id = snap.id;
          this.familyMembers.push(miembro);
        }) 
      })
    }
  }

  miembroChange(checked,miembro){
 
    if(checked.target.checked){
      let encontrado = false;     
      console.log(miembro.id);
      console.log(this.poliza.coveredRelatives); 
      this.poliza.coveredRelatives.forEach((familiarID,i) =>{
        if(familiarID == miembro.id){
          encontrado = true;
        }
      });
      if(!encontrado)
        this.poliza.coveredRelatives.push(miembro.id);
      
      console.log(encontrado);
      console.log(this.poliza.coveredRelatives);
    }
    else{
      let index = 0;
      this.poliza.coveredRelatives.forEach((familiar,i) =>{
        if(familiar.id == miembro.id){
          index = i;
        }
      });
      this.poliza.coveredRelatives.splice(index,1);
      console.log(this.poliza.coveredRelatives)
    }
  }


  async archivos(){
    let modal = await this.modalController.create({
      component: ArchivosPage,
      componentProps: {id:this.poliza.id}
    }); 
    modal.present();
  }

  async comentarios(){
    let modal = await this.modalController.create({
      component: ComentariosPage,
      componentProps: { id:this.poliza.id}
    }); 
    modal.present();
  }

  async clickIcono($event){
    if(!this.isSaved){
      const alert = await this.alertController.create({
        header: 'Guardar',
        message: 'Desea guardar los cambios antes de salir?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.navCtrl.back();
            }
          }, {
            text: 'Si',
            handler: () => { 
              this.registrar();
            }
          }
        ]
      });
  
      await alert.present();
    }
    else{
      this.navCtrl.back();
    }
    
    
  }

  


  async deleteClient() {
    
    const alert = await this.alertController.create({
      header: 'Esta seguro?',
      message: 'Remover titular: '+this.client.firstName+' '+this.client.lastName+' ?',
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
            this.client = new Client();
            this.poliza.coveredRelatives = [];
          }
        }
      ]
    });

    await alert.present();
  }

  

}
