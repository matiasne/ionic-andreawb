import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { AuthenticationFirebaseService } from '../Services/authentication/authentication-firebase.service';


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
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
  ) { 
    this.datosForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: [null, Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      altphone: [''],
      status: ['', Validators.required]
    });
    this.cliente = new Client();
  }

  ngOnInit() {
  }

  get f() { return this.datosForm.controls; }

  registrar(){

    this.submitted = true;
    this.cliente.asignarValores(this.datosForm.value);
    
    //this.clienteService.create(this.cliente);
    //this.datosForm.reset();
    /*this.authService.registrar(this.datosForm.value).subscribe(response =>{
      var resp:any = response;
      console.log(resp.data.data);
      localStorage.setItem('token',resp.data.token);
      localStorage.setItem('user',JSON.stringify(resp.data.user));
      this.authService.authenticationState.next(true);
      this.router.navigate(['/tabs/home']);
    },err=>{
      if(err.status == 0){
        //this.presentAlert("No fue posible conectarnos a nuestros servidores, por favor verifica tu conexión");
        this.presentToast("No fue posible conectarnos a nuestros servidores, por favor verifica tu conexión");
      }
      //email: test_user_53751378@testuser.com
      //password: Yobs2020
      console.log(err);
      let mensaje: string = '';
      Object.keys(err.error.errors).forEach((key,index)=> {
        // key: the name of the object key
        // index: the ordinal position of the key within the object 
        //this.authService.authenticationState.next(false);
        console.log(err.error.errors[key][0])
        mensaje += err.error.errors[key][0] + '\n';
        //this.presentToast(err.error.errors[key][0]);
        //this.presentAlert(err.error.errors[key][0]);
      });
      this.toast(mensaje);
    })*/
  }

  setValue(newValue: any){
    this.f.address = newValue.address;
  }

}
