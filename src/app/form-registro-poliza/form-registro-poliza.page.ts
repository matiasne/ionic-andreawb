import { Component, OnInit } from '@angular/core';
import { Policy } from '../models/policy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { PolizaService } from '../Services/poliza.service';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-form-registro-poliza',
  templateUrl: './form-registro-poliza.page.html',
  styleUrls: ['./form-registro-poliza.page.scss'],
})
export class FormRegistroPolizaPage implements OnInit {
  poliza: Policy;
  datosForm: FormGroup;
  submitted = false;
  clientes: Client[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private polizaService: PolizaService,
    private toastService:ToastService
  ) { 
    this.datosForm = this.formBuilder.group({
      id: [''],
      broker_id: [''],
      number: ['', Validators.required],
      client: ['', Validators.required],
      clientMembers: [[]],
      receivedDate: [null, Validators.required],
      effectiveDate: [null, Validators.required],
      policyTermDate: [null, Validators.required],
      paidThroughDate: [null, Validators.required],
      state: ['', Validators.required],
      responsability: ['', Validators.required],
      autoplay: ['', Validators.required],
      elegibleForCommission: [''],
      number_ofMembers: ['', Validators.required],
      payable_agent_id: [''],
    });
    this.poliza = new Policy();
  }

  ngOnInit() {
    this.clientes.push();
  }

  get f() { return this.datosForm.controls; }

  registrar(){

    this.submitted = true;
    if (this.datosForm.invalid) {
      this.toastService.mensaje("","Por favor completar todos los campos solicitados")
      return
    } 

    this.poliza.asignarValores(this.datosForm.value);
    
    //this.PolizaService.create(this.poliza);
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

}
