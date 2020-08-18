import { Component, OnInit } from '@angular/core';
import { AuthenticationFirebaseService } from '../Services/authentication/authentication-firebase.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  public email ="";
  
  constructor(
    private authFirebaseService:AuthenticationFirebaseService
  ) { }

  ngOnInit() {
  }

  recuperarContrasena(){
    this.authFirebaseService.resetPassword(this.email);
  }

}
