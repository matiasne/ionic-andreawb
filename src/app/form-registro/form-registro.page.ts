import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationRafflesService } from '../Services/authentication/authentication-raffles.service';
import { AuthenticationFirebaseService } from '../Services/authentication/authentication-firebase.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.page.html',
  styleUrls: ['./form-registro.page.scss'],
})
export class FormRegistroPage implements OnInit {
  tipoRegistro: string = 'cliente';
  // Importar el ViewChild para acceder a un elemento del DOM
  @ViewChild('passwordEyeRegister') passwordEye;
  @ViewChild('passwordEyeConfirmation') passwordEyeConfirm;
  //@ViewChild('btnCliente') btnCliente;
  //@ViewChild('btnAgente') btnAgente;
  // Seleccionamos el elemento con el nombre que le pusimos con el #
  passwordTypeInput1  =  'password';
  passwordTypeInput2  =  'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword1  =  'eye-off';
  iconpassword2  =  'eye-off';

  datosForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router,
    private authServiceRaffless:AuthenticationRafflesService,
    private authFirestoreService:AuthenticationFirebaseService
  ) { 

    this.datosForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName : ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],      
      passwordConfirmation:['', Validators.required],
      accepted: [false, Validators.required]    
    });
    
  }

  ngOnInit() {
  }

  get f() { return this.datosForm.controls; }

  registrar(){

    this.submitted = true;
    if(this.f.password.value == ''){
      this.presentToast("Debe ingresar una contraseña");
    }
    if(this.f.password.value != this.f.passwordConfirmation.value){
      this.presentToast("La contraseña y su confirmación no coinciden");
    }
    if(this.f.accepted.value != true){
      this.presentToast("Debe leer y aceptar los términos y condiciones");
    }   
    
    this.authFirestoreService.signup(this.datosForm.value);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      color: 'danger',
      duration: 3000
    });
    toast.present();
  }

  /*segmentChanged(event){
    const registro: string = event.target.value;
    if(registro == 'Soy Agente inmobiliario'){
      this.tipoRegistro = 'agente';
      this.datosForm.addControl('cuit', new FormControl('', Validators.required));
    }else{
      this.tipoRegistro = 'cliente';
      this.datosForm.removeControl('cuit');
    } 
  }*/

  // Esta función verifica si el tipo de campo es texto lo cambia a password y viceversa, 
  //además verificara el icono si es 'eye-off' lo cambiara a 'eye' y viceversa
  togglePasswordMode() {
    this.passwordTypeInput1  =  this.passwordTypeInput1  ===  'text'  ?  'password'  :  'text';
    this.iconpassword1  =  this.iconpassword1  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

  togglePasswordConfirmMode() {
    this.passwordTypeInput2  =  this.passwordTypeInput2  ===  'text'  ?  'password'  :  'text';
    this.iconpassword2  =  this.iconpassword2  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEyeConfirm.el.setFocus();
  }

  /*onChange(){
    
  }*/
}
