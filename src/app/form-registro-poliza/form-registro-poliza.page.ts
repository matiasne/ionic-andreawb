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
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
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
      agentId: [''], 
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
      autoplay: ['', Validators.required],
      elegibleForCommission: [''],
    });

    

    this.poliza = new Policy();
    this.client = new Client();
    this.agent = new Usuario();
    console.log(this.isEditing);

    this.companiaService.list().subscribe(snapshot=>{
      console.log(snapshot)
      this.companias = snapshot;
    })

    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){

    if(this.parametrosService.param.poliza instanceof Policy){
      this.isEditing = true;
      console.log(this.parametrosService.param)
      this.poliza = this.parametrosService.param.poliza;
      this.datosForm.patchValue(this.parametrosService.param.poliza);
      
      if(this.poliza.clientRef){
        this.poliza.clientRef.get().then(snap =>{
          this.client.asignarValores(snap.data());
          this.client.id = snap.id;
          console.log(this.client)
        }) 
      }    

      if(this.poliza.agentRef){
        this.poliza.agentRef.get().then(snap =>{
          this.agent.asignarValores(snap.data());
          this.agent.id = snap.id;
          console.log(this.agent)
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
      console.log("no guardado!")
    })
  }

  changeCompany(event){
    console.log("!!!!!!!!!!!!!")
    console.log(event.target.value)
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

    console.log(this.datosForm.value)

    if(this.datosForm.invalid){
      this.toastService.mensaje("","Por favor completar todos los campos solicitados")
      return
    }  

    this.poliza.asignarValores(this.datosForm.value);
    console.log(this.poliza);
    this.poliza.clientRef =""; //Para que al convertirlo a json.stringify no tire error de Cirular 
    this.poliza.agentRef =""; //Para que al convertirlo a json.stringify no tire error de Cirular 
    this.poliza.familyMembersRef = [];

    const item = JSON.parse(JSON.stringify(this.poliza)); 
    
    if(this.client.id != ""){
     item.clientRef = this.clienteService.getRef(this.client.id); //se hace despues porque el documentReference da mal en JSON.stringify
     item.clientName = this.client.firstName+' '+this.client.lastName;
    }
    
    this.familyMembers.forEach(member =>{
      console.log(member)
      item.familyMembersRef.push(this.clienteService.getRef(member.id));
    });
    
    
    item.agentRef = this.usuarioService.getActualRef();  
    item.agentName = this.usuarioService.getNombre();
    item.agentId = this.usuarioService.getUID();

    this.loadingService.presentLoading();
    this.isSaved = true;
    if(this.isEditing){
      this.loadingService.dismissLoading();
      this.polizaService.update(item).then(data =>{
        console.log(data);
        this.toastService.mensaje("","Policy updated");
      })
    }
    else{      
      this.polizaService.add(item).then(data =>{
        this.loadingService.dismissLoading();
        this.isEditing = true; //Pasa a estar editando
        console.log(data);
        this.toastService.mensaje("","New Policy created");
      })
    }   

    this.parametrosService.param = "";
  }

  async addClient(){
    const modal = await this.modalController.create({
      component: SelectClientePage
    });
    modal.onDidDismiss()
    .then((retorno:any) => {
      console.log(retorno.data);

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

  insertClient(cli){
    let encontrado = false;

    if(this.client.id == cli.id){
      encontrado = true;
      this.toastService.mensaje("","Ya se encuentra agregado");
      return;
    }
    this.familyMembers.forEach(member =>{
      if(member.id == cli.id){
        encontrado = true;
      }
    });
    if(!encontrado){
      this.client = cli;       
    }
    else{
      this.toastService.mensaje("","Cliente ya se encuentra como miembro de familia");
    }
  }

  insertFamily(mem){
    let encontrado = false;

    if(this.client.id == mem.id){
      encontrado = true;
      this.toastService.mensaje("","Ya se encuentra agregado como titular");
      return;
    }
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
    console.log(this.isSaved);
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
              this.navCtrl.back();
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
            this.familyMembers.splice(index,1);
          }
        }
      ]
    });

    await alert.present();
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
          }
        }
      ]
    });

    await alert.present();
  }

  

}
