import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationFirebaseService } from '../Services/authentication/authentication-firebase.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Importar el ViewChild para acceder a un elemento del DOM
  @ViewChild('passwordEye') passwordEye;
  // Seleccionamos el elemento con el nombre que le pusimos con el #
  passwordTypeInput  =  'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword  =  'eye-off';

  public email:string;
  public password:string;

  constructor(
    private authFirebaseService:AuthenticationFirebaseService,
    public alertController: AlertController,
    public router:Router,
  ) { }

  ngOnInit() {
  }

  login(){
    this.authFirebaseService.login(this.email.trim(),this.password.trim()); 
    
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public googleLogin(){
    this.authFirebaseService.googleSignin();
  }

  // Esta función verifica si el tipo de campo es texto lo cambia a password y viceversa, 
  //además verificara el icono si es 'eye-off' lo cambiara a 'eye' y viceversa
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

}
