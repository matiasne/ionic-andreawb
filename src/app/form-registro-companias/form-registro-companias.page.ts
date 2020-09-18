import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { CompaniaService } from '../Services/compania.service';
import { ToastService } from '../Services/toast.service';
import { UsuarioService } from '../Services/usuario.service';
import { ParametrosService } from '../Services/global/parametros.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-registro-companias',
  templateUrl: './form-registro-companias.page.html',
  styleUrls: ['./form-registro-companias.page.scss'],
})
export class FormRegistroCompaniasPage implements OnInit {

  tipoRegistro: string = 'compania';
  compania: Company;
  datosForm: FormGroup;
  submitted = false;
  isEditing = false;
  readonly = true;
  titulo ="New Company";
  usuario:Usuario;
  planes: string[] = [];
  plan: string;

  public croppedImageIcono ="";

  constructor(
    private formBuilder: FormBuilder,
    private companiaService: CompaniaService,
    private toastService:ToastService,
    private usuarioService:UsuarioService,
    private parametrosService:ParametrosService,
    private modalController:ModalController,
    private alertController:AlertController
  ) { 
    this.datosForm = this.formBuilder.group({
      id:['',null],
      foto:['',null],
      name: ['', Validators.required],
      plans: ['', null],
    });

    this.compania = new Company();

    if(this.parametrosService.param.compania instanceof Company){
      this.isEditing = true;      
      console.log(this.parametrosService.param)
      this.compania = this.parametrosService.param.compania;
      this.datosForm.patchValue(this.parametrosService.param.compania);
      this.titulo = "Edit Company";
      this.planes = this.compania.plans;
      this.croppedImageIcono = this.compania.foto;    
    }
    this.readonly = this.parametrosService.param.readonly;
    if(this.usuarioService.isAdmin()){
      this.readonly = false;
    }
    if(this.readonly){
      this.titulo = this.compania.name;
    }
  }

  ngOnInit() {
  }

  imagenSeleccionadaIcono(newValue : any){
    console.log(newValue);
    this.datosForm.patchValue({
      foto: newValue
    })
   }


  get f() { return this.datosForm.controls; }

  registrar(){
    this.submitted = true;     
    /*this.datosForm.patchValue({
      agentId: this.usuarioService.getUID()
    });*/
    this.datosForm.patchValue({
      plans: this.planes
    });
    if(this.datosForm.invalid){
      this.toastService.mensaje("","Por favor completar todos los campos solicitados");
      return;
    }  
    this.compania.asignarValores(this.datosForm.value);
    console.log(this.compania);
    const item = JSON.parse(JSON.stringify(this.compania)); 
    if(this.isEditing){
      this.companiaService.update(item).then(data =>{
        console.log(data);
      });
    }
    else{
      this.companiaService.add(item).then(data =>{
        console.log(data);
        this.modalController.dismiss(data);
      });
    }   
    this.modalController.dismiss();
    this.parametrosService.param = "";
  }

  clickIcono($event){
    this.modalController.dismiss();
  }

  

  async agregarPlan(){
    
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'New Plan',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Name'
          }          
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              this.planes.push(data.name);
            }
          }
        ]
      });
  
      await alert.present();
    
  }

  eliminarPlan(index: number){
    this.planes.splice(index, 1);
  }

}
